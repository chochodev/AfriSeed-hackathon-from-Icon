// components/Modal.tsx
import Input from '$/components/input';
import React, { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: {
    name: string;
    minimumInvestment: number;
  }
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, business }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const [value, setValue] = useState<number>(business.minimumInvestment)

  // :::::::::::::::::::: submit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', business)
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white px-[2rem] py-[1.5rem] rounded-lg max-w-lg w-full transform transition-transform ${
          isOpen ? 'translate-y-0' : 'translate-y-10'
        }`}
      >
        <button className="text-neutral-600 hover:text-neutral-800 hover:bg-neutral-200 rounded-full p-[0.25rem] mb-4 ml-[calc(100%-2rem)]" onClick={onClose}>
          <RiCloseLine className='text-[1.5rem]' />
        </button>

        <h2 className="text-xl font-bold mb-4">Invest in {business.name}</h2>
        <form onSubmit={handleSubmit} className='space-y-[2rem]'>
          <div className="mb-4 space-y-[1rem] ">
            <label htmlFor="amount" className="text-[0.875rem] font-[600] text-neutral-600 uppercase">
              Amount ($)
            </label>
            <Input
              type="number"
              id="amount"
              name="amount"
              value={value}
              onChange={(e) => {setValue(Number(e.target.value))}}
              className=""
              placeholder={`Minimum $${business.minimumInvestment}`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-neutral-800 text-neutral-100 font-[600] py-[0.875rem] rounded-full outline outline-1 outline-neutral-300 hover:bg-neutral-100 hover:text-neutral-800"
          >
            Confirm Investment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
