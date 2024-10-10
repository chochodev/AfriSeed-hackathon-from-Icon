import React from 'react';

interface InputProps {
  id: string;
  name: string;
  value: string | number;
  type?: 'text' | 'textarea' | 'number';
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ id, name, value, type = 'text', onChange, required = false }) => {
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
          onChange={onChange}
          required={required}
          className="form-input"
        />
      )}
    </div>
  );
};

export default Input;
