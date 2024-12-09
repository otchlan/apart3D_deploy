import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="w-full h-full min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-b from-white to-purple-50">
      <div className="text-center">
        <Loader2 className="w-16 h-16 animate-spin text-purple-600 mx-auto mb-4" />
        <p className="text-xl font-semibold text-gray-800">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;