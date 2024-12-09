"use client"
import React, { useState, useEffect, useRef } from 'react';
import AerialViewDebugger from './ArealViewDebugger';

const AerialView: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // API key and location
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyAi5h1OJ_2BBeP5neBRXP4OhVF6nFUkHCA';
  const PARAMETER_VALUE = '1600 Amphitheatre Parkway, Mountain View, CA 94043';

  const initAerialView = async () => {
    try {
      const urlParameter = new URLSearchParams({
        address: PARAMETER_VALUE,
        key: API_KEY
      });

      const response = await fetch(
        `https://aerialview.googleapis.com/v1/videos:lookupVideo?${urlParameter.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Log the full response for debugging
      const responseText = await response.text();
      console.log('Full Response:', responseText);

      // Parse the response as JSON
      let videoResult;
      try {
        videoResult = JSON.parse(responseText);
      } catch (parseError) {
        setError('Failed to parse API response');
        console.error('Parsing Error:', parseError);
        return;
      }

      // Detailed error handling
      if (!response.ok) {
        setError(`API Error: ${response.status} - ${videoResult?.error?.message || 'Unknown error'}`);
        return;
      }

      // Check for specific error conditions
      if (videoResult.state === 'PROCESSING') {
        setError('Video is still processing');
        return;
      }

      if (videoResult.error) {
        setError(`Error: ${videoResult.error.message}`);
        return;
      }

      // Validate video source
      if (!videoResult.uris?.MP4_MEDIUM?.landscapeUri) {
        setError('No video source available');
        return;
      }

      setVideoSrc(videoResult.uris.MP4_MEDIUM.landscapeUri);

    } catch (err) {
      setError(`Network Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Fetch Error:', err);
    }
  };

  useEffect(() => {
    initAerialView();
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    }
  };

  return (
    <div className="container mx-auto p-4">

    <div>
      <h1>API Debugger</h1>
      <AerialViewDebugger />
    </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-gray-100 border-b">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Google Aerial View
          </h2>
        </div>
        {error ? (
          <div className="p-4 bg-red-100 text-red-800">
            <p>Error: {error}</p>
            <p className="text-sm mt-2">
              This could be due to API restrictions, invalid key, or service unavailability.
            </p>
          </div>
        ) : videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            onClick={handleVideoClick}
            className="w-full h-[600px] object-cover cursor-pointer"
            controls
          />
        ) : (
          <div className="p-4 text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default AerialView;