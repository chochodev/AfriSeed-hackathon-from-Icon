import React from 'react';
import { Terminal } from 'lucide-react';

interface AlertProps {
  title: string;
  text: string;
}

const Alert: React.FC<AlertProps> = ({ title, text }) => {
  return (
    <div className="fixed top-[1.5rem] right-4 ml-4 z-50 bg-white border border-neutral-300 rounded-lg shadow-lg p-4 flex items-start shadow-[0_0_20px_2px_rgba(0,0,0,0.2)]">
      <Terminal className="h-5 w-5 text-neutral-500 mr-2" />
      <div>
        <h4 className="font-bold text-lg">{title}</h4>
        <p className="text-sm text-neutral-700">{text}</p>
      </div>
    </div>
  );
};

export default Alert;
