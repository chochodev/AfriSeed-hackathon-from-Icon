import Input from '$/components/input';
import React, { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import axios from 'axios';
import { contract } from '$/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: {
    name: string;
    minimum_investment: number;
    project_address: string;
    id: string;
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, business }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const [value, setValue] = useState<number>(business.minimum_investment);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { mutate: sendTransaction } = useSendTransaction();

  // :::::::::::::::::::: submit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare the transaction
    const transaction = prepareContractCall({
      contract,
      method: "function contribute(address _projectAddress) payable",
      params: [business.project_address],
      value: BigInt(value * 1e18)
    });

    try {
      // Send the transaction to the smart contract
      sendTransaction(transaction, {
        onSuccess: async () => {
          try {
            // Update backend with the number of investors and amount raised
            const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/businesses/invest/${business.id}`, {
              amount: value,
            });

            setIsSubmitted(true);
            console.log(response)
          }
          catch (error) {
            console.error('Error creating business:', error);
          }
        },
        onError: (error) => {
          console.error("Transaction error: ", error);
        }
      })

    } catch (error) {
      console.error('Transaction failed or backend update failed:', error);
    }
  };

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
        <button
          className="text-neutral-600 hover:text-neutral-800 hover:bg-neutral-200 rounded-full p-[0.25rem] mb-4 ml-[calc(100%-2rem)]"
          onClick={() => {
            setIsSubmitted(false);
            onClose();
          }}
        >
          <RiCloseLine className="text-[1.5rem]" />
        </button>

        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Thank You!</h2>
            <p className="text-neutral-600 mb-4">
              Your investment in {business.name} has been successfully submitted.
            </p>
            <button
              className="w-full bg-neutral-800 text-neutral-100 font-[600] py-[0.875rem] rounded-full outline outline-1 outline-neutral-300 hover:bg-neutral-100 hover:text-neutral-800"
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Invest in {business.name}</h2>
            <form onSubmit={handleSubmit} className="space-y-[2rem]">
              <div className="mb-4 space-y-[1rem]">
                <label
                  htmlFor="amount"
                  className="text-[0.875rem] font-[600] text-neutral-600 uppercase"
                >
                  Amount ($)
                </label>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  value={value}
                  onChange={(e) => {
                    setValue(Number(e.target.value));
                  }}
                  placeholder={`Minimum $${business.minimum_investment}`}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-neutral-800 text-neutral-100 font-[600] py-[0.875rem] rounded-full outline outline-1 outline-neutral-300 hover:bg-neutral-950 active:bg-neutral-500 active:text-neutral-800 ease-250"
              >
                Confirm Investment
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
