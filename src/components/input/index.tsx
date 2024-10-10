import React from 'react';

interface InputProps {
  id: string;
  name: string;
  value: string | number;
  type?: 'text' | 'textarea' | 'number';
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ id, name, value, className, placeholder, type = 'text', onChange, required = false }) => {
  return (
    <>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value as string}
          onChange={onChange}
          required={required}
          className={`w-full py-[0.4rem] px-[0.875rem] ring-[1px] ring-neutral-300 text-neutral-500 font-[600] focus:ring-neutral-400 focus:shadow-[0_0_1px_5px_rgba(0,0,0,0.1)] rounded-[8px] resize-x-none ${className}`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          className={`w-full py-[0.4rem] px-[0.875rem] ring-[1px] ring-neutral-300 text-neutral-500 font-[600] focus:ring-neutral-400 focus:shadow-[0_0_1px_5px_rgba(0,0,0,0.1)] rounded-[8px] ${className}`}
        />
      )}
    </>
  );
};

export default Input;
