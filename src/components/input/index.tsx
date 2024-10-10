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

const Input: React.FC<InputProps> = ({ id, name, value, className, placeholder = 'text', type = 'text', onChange, required = false }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id}>{name}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value as string}
          onChange={onChange}
          required={required}
          className="form-textarea"
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
          className={`w-full py-[0.375rem] px-[0.875rem] ring-[1px] ring-neutral-400 text-neutral-500 font-[600] focus:shadow-[0_0_1px_5px_rgba(0,0,0,0.1)] rounded-[8px] ${className}`}
        />
      )}
    </div>
  );
};

export default Input;
