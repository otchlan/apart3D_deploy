"use client";
import React, { useState, useEffect } from 'react';

const AerialViewDebugger: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const performDetailedApiCheck = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY';
    const LOCATION = '1600 Amphitheatre Parkway, Mountain View, CA 94043';

    const addDebugLog = (message: string) => {
      setDebugInfo(prev => [...prev, message]);
    };

    try {
      addDebugLog(`Attempting to fetch Aerial View for: ${LOCATION}`);
      
      const response = await fetch(
        `https://aerialview.googleapis.com/v1/videos:lookupVideo?address=${encodeURIComponent(LOCATION)}&key=${API_KEY}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      addDebugLog(`Response Status: ${response.status}`);
      addDebugLog(`Response Headers:`);

      // Log all response headers
      response.headers.forEach((value, key) => {
        addDebugLog(`${key}: ${value}`);
      });

      const responseText = await response.text();
      addDebugLog('Raw Response:');
      addDebugLog(responseText);

      try {
        const jsonResponse = JSON.parse(responseText);
        addDebugLog('Parsed JSON Response:');
        addDebugLog(JSON.stringify(jsonResponse, null, 2));
      } catch (parseError) {
        addDebugLog('Failed to parse response as JSON');
        addDebugLog(String(parseError));
      }
    } catch (error) {
      addDebugLog('Fetch Error:');
      addDebugLog(String(error));
      if (error instanceof TypeError) {
        addDebugLog('Network Error Details:');
        addDebugLog(`Name: ${error.name}`);
        addDebugLog(`Message: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    performDetailedApiCheck();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Aerial View API Debugger</h2>
      <div className="bg-white border rounded p-3">
        <h3 className="font-semibold mb-2">Debug Logs:</h3>
        {debugInfo.map((log, index) => (
          <div 
            key={index} 
            className="text-sm border-b py-1 last:border-b-0"
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AerialViewDebugger;
