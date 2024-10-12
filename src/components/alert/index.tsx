import React from 'react';
import { Terminal } from 'lucide-react';

interface AlertProps {
  title: string;
  text: string;
}

const Alert: React.FC<AlertProps> = ({ title, text }) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex items-start">
      <Terminal className="h-5 w-5 text-gray-500 mr-2" />
      <div>
        <h4 className="font-bold text-lg">{title}</h4>
        <p className="text-sm text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default Alert;
