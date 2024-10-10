// components/Modal.tsx
import React, { useEffect } from 'react';

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

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg max-w-lg w-full transform transition-transform ${
          isOpen ? 'translate-y-0' : 'translate-y-10'
        }`}
      >
        <button className="text-neutral-600 hover:text-neutral-800 mb-4" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold mb-4">Invest in {business.name}</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
