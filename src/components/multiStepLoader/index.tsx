import React from 'react';
import './style.css'

interface LoaderProps {
  message: string;
  status: 'loading' | 'success' | 'error';
}

const MultiStepLoader: React.FC<LoaderProps> = ({ message, status }) => {
  let color = 'text-gray-500';
  
  if (status === 'success') {
    color = 'text-green-500';
  } else if (status === 'error') {
    color = 'text-red-500';
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className={`loader-circle ${status === 'loading' ? 'animate-spin' : ''} ${color}`}></div>
      <p className={`text-lg ${color}`}>{message}</p>
    </div>
  );
};

export default MultiStepLoader;
