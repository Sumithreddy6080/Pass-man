// components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'default', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
        <p className="text-white text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;