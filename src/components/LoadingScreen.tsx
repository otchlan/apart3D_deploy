import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="w-full h-full min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-b from-white to-purple-50 overflow-hidden">
      <div className="text-center relative">
        {/* Spinning loader */}
        <Loader2 className="w-16 h-16 animate-spin text-purple-600 mx-auto mb-4" />
        
        {/* Placeholder content with more dynamic animation */}
        <div className="max-w-lg mx-auto space-y-6 relative">
          {/* Large moving placeholders */}
          <div className="absolute -left-20 top-0 w-64 h-32 bg-gray-200/50 rounded-xl animate-move-x opacity-50"></div>
          <div className="absolute -right-20 bottom-0 w-72 h-40 bg-purple-200/50 rounded-xl animate-move-y opacity-50"></div>
          
          {/* Static placeholder elements */}
          <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-5/6 mx-auto"></div>
          <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-3/4 mx-auto"></div>
          
          <p className="text-xl font-semibold text-gray-800 relative z-10">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;