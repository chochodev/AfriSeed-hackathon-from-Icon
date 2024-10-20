import MainLayout from '$/layout';
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Input from "$/components/input";
import { RiImageAddLine } from "react-icons/ri";
import Alert from '$/components/alert';
import { useNavigate } from 'react-router-dom';
import { 
  useSendTransaction, 
  useActiveWalletConnectionStatus, 
  useActiveWallet 
} from "thirdweb/react";
import { prepareContractCall, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { CONTRACT_ADDRESS, client } from '$/lib/utils';
import MultiStepLoader from '$/components/multiStepLoader';
import DeadlineDatePicker from '$/components/datePicker';


interface Business {
  full_name: string
  name: string
  short_description: string
  location: string
  category: string
  minimum_investment: number
  days_left: Date

  amount_raised: number
  investors: number

  // ::::::::::::::: pitch
  pitch_summary: string
  pitch_problem: string
  pitch_solution: string
  pitch_market_opportunity: string
  pitch_traction: string
}

interface BusinessWithoutDate {
  full_name: string
  name: string
  short_description: string
  location: string
  category: string
  minimum_investment: number

  amount_raised: number
  investors: number

  // ::::::::::::::: pitch
  pitch_summary: string
  pitch_problem: string
  pitch_solution: string
  pitch_market_opportunity: string
  pitch_traction: string
}
// const initialBusiness: Business = {
//   full_name: 'John Doe',
//   name: 'TEST-BIZ',
//   short_description: 'AfriCommerce is a digital platform designed to help small enterprises in Africa easily set up online stores, manage inventory, accept digital payments, and connect with a larger customer base.',
//   location: 'Lagos, Test',
//   category: 'E-Commerce',
//   amount_raised: 12000,
//   investors: 21,
//   minimum_investment: 100,
//   days_left: 10,

//   // :::::::::::::::::: pitch
//   pitch_summary: 'AfriCommerce is a digital platform designed to help small enterprises in Africa easily set up online stores, manage inventory, accept digital payments, and connect with a larger customer base. It provides tailored solutions for African businesses, focusing on ease of use, local payment methods, and business growth through technology.',
//   pitch_problem: 'AfriCommerce is a digital platform designed to help small enterprises in Africa easily set up online stores, manage inventory, accept digital payments, and connect with a larger customer base. It provides tailored solutions for African businesses, focusing on ease of use, local payment methods, and business growth through technology.',
//   pitch_solution: 'AfriCommerce is a digital platform designed to help small enterprises in Africa easily set up online stores, manage inventory, accept digital payments, and connect with a larger customer base. It provides tailored solutions for African businesses, focusing on ease of use, local payment methods, and business growth through technology.',
//   pitch_market_opportunity: 'AfriCommerce is a digital platform designed to help small enterprises in Africa easily set up online stores, manage inventory, accept digital payments, and connect with a larger customer base. It provides tailored solutions for African businesses, focusing on ease of use, local payment methods, and business growth through technology.',
//   pitch_traction: 'AfriCommerce is a digital platform designed to help small enterprises in Africa easily set up online stores, manage inventory, accept digital payments, and connect with a larger customer base. It provides tailored solutions for African businesses, focusing on ease of use, local payment methods, and business growth through technology.',
// }

const initialBusiness: Business = {
  full_name: '',
  name: '',
  short_description: '',
  location: '',
  category: '',
  amount_raised: 0,
  investors: 0,
  minimum_investment: 0,
  days_left: new Date(),

  // :::::::::::::::::: pitch
  pitch_summary: '',
  pitch_problem: '',
  pitch_solution: '',
  pitch_market_opportunity: '',
  pitch_traction: '',
}

const textAreaField = [
  {name: 'short_description', title: 'Short Description', placeholder: 'e.g AI-powered software as a service aimed at ...'},
  {name: 'pitch_summary', title: 'Pitch Summary', placeholder: 'e.g In summary, this aims to not only empower users but improve the quality of ...'},
  {name: 'pitch_problem', title: 'Pitch Problem', placeholder: 'e.g Many businesses struggle to effectively utilize their data due to lack of expertise ...'},
  {name: 'pitch_solution', title: 'Pitch Solution', placeholder: 'e.g Our AI-powered platform democratizes access to advanced data ...'},
  {name: 'pitch_market_opportunity', title: 'Pitch Market Opportunity', placeholder: 'e.g The global AI market is projected to grow from $387.45 ...'},
  {name: 'pitch_traction', title: 'Pitch Traction', placeholder: 'e.g In our first year, we&apos;ve onboarded 50+ clients across ...'},
];

const numberField = [
  { name: 'amount_raised', title: 'Amount Raised ($)' },
  { name: 'investors', title: 'Number of Investors' },
  { name: 'minimum_investment', title: 'Minimum Investment ($)' }
]

export default function BusinessForm() {
  const [business, setBusiness] = useState<Business>(initialBusiness);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [alert, setAlert] = useState<{ text: string; title: string;} | null>(null);
  const navigate = useNavigate();

  // :::::::::::::::::::: loader state
  const [isLoading, setIsLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = 
    useState<'loading' | 'success' | 'error' | null>(null);
  const [transactionMessage, setTransactionMessage] = useState('');

  // ::::::::::::::::::::: web3 states
  const activeWallet = useActiveWallet();
  const connectionStatus = useActiveWalletConnectionStatus();
  const { mutate: sendTransaction, status } = useSendTransaction();
  
  const contract = getContract({
    client,
    chain: defineChain(84532),
    address: CONTRACT_ADDRESS,
  });

  // ::::::::::::::::::::::::::: handle input functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusiness(prev => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusiness(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
  }

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    // const today = new Date();
    setBusiness(prev => ({ ...prev, days_left: selectedDate }));
  }

  // :::::::::::::::::::: image function
  const onDrop = useCallback((acceptedFiles: File[], type: 'logo' | 'cover_image') => {
    const file = acceptedFiles[0];

    if (type === 'logo') {
      setLogoFile(file);
    } else if (type === 'cover_image') {
      setCoverImageFile(file);
    }
  }, [])

  // ::::::::::::::::::::: clean up when component unmounts
  useEffect(() => {
    return () => {
      if (logoFile) URL.revokeObjectURL(URL.createObjectURL(logoFile));
      if (coverImageFile) URL.revokeObjectURL(URL.createObjectURL(coverImageFile));
    };
  }, [logoFile, coverImageFile]);

  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
    onDrop: (files: File[]) => onDrop(files, 'logo'),
    accept: { 'image/*': [] },
    multiple: false
  })

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({
    onDrop: (files: File[]) => onDrop(files, 'cover_image'),
    accept: { 'image/*': [] },
    multiple: false
  })

  // :::::::::::::::::::: SUBMIT FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // :::::::::::::: image fields requirement
    if (!logoFile || !coverImageFile) {
      setAlert({ 
        text: 'Logo and Cover image are required before submission.', 
        title: 'Missing Files' 
      });
      setIsLoading(false);
      return;
    }
  
    // :::::::::::::: return if wallet is not connected
    if (connectionStatus !== 'connected') {
      setAlert({ 
        text: 'Please connect your wallet before submission.', 
        title: 'Wallet Not Connected' 
      });
      setIsLoading(false);
      return;
    }
  
    // ::::::::::::::::: loading state
    setTransactionMessage("Transaction is initiating");
    setTransactionStatus("loading");
    setIsLoading(true);
    
    console.log('first status: ', status);
  
    try {
      // :::::::::::::::::::: web3 section - transaction first
      const transaction = prepareContractCall({
        contract,
        method: "function createProject(uint256 minimumContribution, uint256 deadline, uint256 targetContribution, string projectTitle, string projectDesc)",
        params: [
          BigInt(business.minimum_investment),
          BigInt(Math.floor(business?.days_left?.getTime() / 1000)),// to UNIX timestamp
          BigInt(business.amount_raised),
          business.name,
          business.short_description
        ]
      });
      
      setTransactionMessage("Transaction is processing.");
      setTransactionStatus("loading");
  
      // ::::::::::::::::::: Execute the transaction
      sendTransaction(transaction, {
        onSuccess: async () => {
          setTransactionMessage("Transaction successful!");
          setTransactionStatus("success");
  
          // :::::::::::::::::::::: Make the backend API call after successful transaction
          const jsonData = { 
            ...business,
            logo: logoFile,
            cover_image: coverImageFile,
            client_address: activeWallet?.getAccount()?.address
          };
  
          const backend_url = import.meta.env.VITE_APP_BACKEND_URL;
          const response = await axios.post(`${backend_url}/businesses/`, jsonData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
          });
  
          // :::::::::::::::::: Reset the business form data and show alert
          setBusiness(initialBusiness);
          setLogoFile(null);
          setCoverImageFile(null);
  
          setAlert({
            text: `Business ${response.data.name} created successfully and smart contract transaction sent`,
            title: 'Success',
          });
  
          // :::::::::::::: Redirect after 4s
          const timeout = setTimeout(() => {
            navigate('/business');
          }, 5000);
          return () => clearTimeout(timeout);
        },
        onError: (error) => {
          setTransactionMessage("Transaction failed!");
          setTransactionStatus("error");

          console.error("Transaction error: ", error);

          // :::::::::::: remove the multi step loader
          const timeout = setTimeout(() => {
            setIsLoading(false);
          }, 5000);

          return () => clearTimeout(timeout);
        }
      });
  
    } catch (error) {
      setTransactionMessage("Error occurred during transaction preparation or backend request.");
      setTransactionStatus("error");
      console.error(error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'pending') {
      setTransactionMessage("Transaction is processing.");
      setTransactionStatus("loading");
    } else if (status === 'error') {
      setTransactionMessage("Transaction failed!");
      setTransactionStatus("error");
      throw new Error('Transaction failed');
    }
  }, [status])

  return (
    <MainLayout>
      {/* :::::::::::::::::: Show loader while transaction is being processed */}
      {isLoading &&
        <MultiStepLoader message={transactionMessage} status={transactionStatus || 'loading'} />
      }

      {/* :::::::::::::::::: alert component */}
      {alert && (
        <Alert
          text={alert.text}
          title={alert.title}
        />
      )}
      <div className='size-full py-[4rem] px-[1rem] lg:px-[2rem] bg-neutral-50'>
        <div className="max-w-[72rem] mx-auto">
          <h1 className="text-3xl font-bold mb-6">Pitch Your Business Ideas</h1>
          <p className='text-[1rem] font-[600] text-neutral-600'>Instructions:</p>
          <p className='text-[0.875rem] text-neutral-500 font-[600] pl-[1rem] mt-[1rem] '>
            1. Fill out the form truthfully.<br/>
            2. Submit your application for review.<br/>
            3. Once approved, your business will be visible to all investors.
          </p> 

          {/* ::::::::::::::::::::::::::::::: form */}
          <form onSubmit={handleSubmit} className="space-y-[2rem] mt-[2rem] ">
            <div className="space-y-2">
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="name">Full name</label>
              <Input
                id="full_name"
                name="full_name"
                value={business.full_name}
                onChange={handleInputChange}
                className=''
                placeholder='e.g John Doe'
                required
              />
            </div>

            <div className="space-y-2">
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="name">Business Name</label>
              <Input
                id="name"
                name="name"
                value={business.name}
                onChange={handleInputChange}
                className=''
                placeholder='e.g AfriSeed'
                required
              />
            </div>

            {/* ::::::::::::::::: business logo */}
            <div className="space-y-2">
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase'>Business Logo</label>
              <div {...getLogoRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-neutral-500">
                <input {...getLogoInputProps()} />
                <div className="flex flex-col items-center">
                  {logoFile ? (
                    <img src={URL.createObjectURL(logoFile)} alt="Logo" className="size-[12.5rem] rounded-[4px] object-cover mb-4" />
                  ) : (
                    <RiImageAddLine className='text-[3.5rem] text-neutral-400' />
                  )}
                  <p className="text-sm text-gray-500">Drag and drop or click to upload logo</p>
                </div>
              </div>
            </div>

            {/* ::::::::::::::::: business cover image */}
            <div className="space-y-2">
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase'>Cover Image</label>
              <div {...getCoverRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-neutral-500">
                <input {...getCoverInputProps()} />
                <div className="flex flex-col items-center">
                  {coverImageFile ? (
                    <img src={URL.createObjectURL(coverImageFile)} alt="Cover" className="size-[12.5rem] rounded-[4px] mb-4 object-cover" />
                  ) : (
                    <RiImageAddLine className='text-[3.5rem] text-neutral-400' />
                  )}
                  <p className="text-sm text-gray-500">Drag and drop or click to upload cover image</p>
                </div>
              </div>
            </div>

            {textAreaField.map((info, i) => (
              <div key={i} className="space-y-2">
                <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor={info.name}>{info.title}</label>
                <Input
                  id={info.name}
                  name={info.name}
                  value={business[info.name as keyof BusinessWithoutDate] || ''}
                  onChange={handleInputChange}
                  placeholder={info.placeholder}
                  className={`${i > 0 && 'min-h-[5rem]'}`}
                  required
                />
              </div>
            ))}

            {/* ::::::::::::::::::: LOCATION */}
            <div className="space-y-2">
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="location">Location</label>
              <Input
                id="location"
                name="location"
                value={business.location}
                onChange={handleInputChange}
                placeholder='e.g Lagos, Nigeria'
                required
              />
            </div>

            {/* ::::::::::::::::::: CATEGORY */}
            <div className="space-y-2">
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="category">Category</label>
              <Input
                id="category"
                name="category"
                value={business.category}
                onChange={handleInputChange}
                placeholder='e.g IT & Programming'
                required
              />
            </div>

            {/* ::::::::::::::::::: MONEY */}
            <div className="grid grid-cols-1 smd:grid-cols-2 gap-4">
              {numberField.map((field, i) => (
                <div key={i} className="flex flex-col space-y-2">
                  <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor={field.name}>
                    {field.title}
                  </label>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={business[field.name as keyof BusinessWithoutDate] || 0}
                    onChange={handleNumberChange}
                    required
                  />
                </div>
              ))}

              <div className="space-y-1">
                <label htmlFor="days_left" className='text-[0.875rem] font-[600] text-neutral-600 uppercase'>Deadline</label>
                {/* <br/> */}
                <input
                  type="date"
                  id="days_left"
                  value={business.days_left.toISOString().split('T')[0]}
                  className='w-full py-[0.4rem] px-[0.875rem] ring-[1px] ring-neutral-300 text-neutral-500 font-[600] focus:ring-neutral-400 focus:shadow-[0_0_1px_5px_rgba(0,0,0,0.1)] rounded-[8px]'
                  onChange={handleDeadlineChange}
                  required
                />
              </div>
            </div>

            {/* ::::::::::::::::::::: SUBMIT BUTTON */}
            <button 
              type="submit" 
              className="w-full bg-neutral-800 text-neutral-100 font-[600] text-[0.875rem] px-[2rem] py-[0.875rem] rounded-[8px] outline outline-1 outline-neutral-300 hover:bg-neutral-100 hover:text-neutral-800 active:bg-neutral-200 shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] ease-250"
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}