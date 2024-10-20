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
  } else if (status === 'loading') {
    color = 'text-black';
  }

  return (
    <div 
      className="fixed z-[100] inset-0 flex flex-col justify-center items-center space-y-4 bg-gradient-to-br from-black/50 via-black/60 to-black/80 p-[2rem] pt-[-2rem] "
    >
      <div className='flex items-end justify-center h-[20rem] w-full max-w-[30rem] p-[4rem] bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 rounded'>
        <div className="banter-loader">
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
        </div>

        <p className={`uppercase font-[600] text-[0.75rem] h-max bg-white ${color} text-center py-[0.5rem] px-[1rem] rounded-[4px] mx-auto mt-[1rem] `}>{message}</p>
      </div>
    </div>
  );
};

export default MultiStepLoader;
