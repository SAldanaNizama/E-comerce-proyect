import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
