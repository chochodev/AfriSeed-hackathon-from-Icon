import MainLayout from '$/layout';
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Input from "$/components/input";
import { RiImageAddLine } from "react-icons/ri";
import Alert from '$/components/alert';

interface Business {
  name: string
  short_description: string
  location: string
  category: string
  minimum_investment: number
  days_left: number

  amount_raised: number
  investors: number

  // ::::::::::::::: pitch
  pitch_summary: string
  pitch_problem: string
  pitch_solution: string
  pitch_market_opportunity: string
  pitch_traction: string
}

const initialBusiness: Business = {
  name: '',
  short_description: '',
  location: '',
  category: '',
  amount_raised: 0,
  investors: 0,
  minimum_investment: 0,
  days_left: 0,

  // :::::::::::::::::: pitch
  pitch_summary: '',
  pitch_problem: '',
  pitch_solution: '',
  pitch_market_opportunity: '',
  pitch_traction: '',
}

export default function BusinessForm() {
  const [business, setBusiness] = useState<Business>(initialBusiness);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [alert, setAlert] = useState<{ text: string; title: string;} | null>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusiness(prev => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusiness(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
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
  
    const jsonData = { 
      ...business,
      logo: logoFile,
      cover_image: coverImageFile
    };
    // console.log("Submitting business data:", jsonData);
    
    try {
      const response = await axios.post(
        'http://localhost:8000/businesses/', 
        jsonData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      // ::::::::::::::: resets the business form data and shows alert
      setBusiness(initialBusiness);
      setLogoFile(null);
      setCoverImageFile(null);
      setAlert({ text: `Business ${response.data.name} created successfully`, title: 'Success'});


      console.log(`Business ${response.data.name} created successfully`);

    } catch (error) {
      console.error('Error creating business:', error);
    }
  }

  return (
    <MainLayout>
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

          <div className="space-y-2">
            <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase'>Business Logo</label>
            <div {...getLogoRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-neutral-500">
              <input {...getLogoInputProps()} />
              <div className="flex flex-col items-center">
                {/* {logoFile ? (
                  <img src={logoFile} alt="Logo" className="size-[12.5rem] rounded-[4px] object-cover mb-4" />
                ) : ( */}
                  <RiImageAddLine className='text-[3.5rem] text-neutral-400' />
                {/* )} */}
                <p className="text-sm text-gray-500">Drag and drop or click to upload logo</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase'>Cover Image</label>
            <div {...getCoverRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-neutral-500">
              <input {...getCoverInputProps()} />
              <div className="flex flex-col items-center">
                {/* {coverImageFile ? (
                  <img src={coverImageFile} alt="Cover" className="size-[12.5rem] rounded-[4px] mb-4 object-cover" />
                ) : ( */}
                  <RiImageAddLine className='text-[3.5rem] text-neutral-400' />
                {/* )} */}
                <p className="text-sm text-gray-500">Drag and drop or click to upload cover image</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="short_description">Short Description</label>
            <Input
              id="short_description"
              name="short_description"
              value={business.short_description}
              onChange={handleInputChange}
              placeholder='e.g AI-powered software as a service aimed at ...'
              required
            />
          </div>

          {/* :::::::::::::::: SUMMARY INFORMATION */}
          <div className="space-y-2">
            <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="pitch_summary">Pitch Summary</label>
            <Input
              id="pitch_summary"
              name="pitch_summary"
              type='textarea'
              value={business.pitch_summary}
              onChange={handleInputChange}
              placeholder='e.g In summary, this aims to not only empower users but improve the quality of ...'
              className='min-h-[5rem]'
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="pitch_problem">Pitch Problem</label>
            <Input
              id="pitch_problem"
              name="pitch_problem"
              type='textarea'
              value={business.pitch_problem}
              onChange={handleInputChange}
              placeholder='e.g Many businesses struggle to effectively utilize their data due to lack of expertise ...'
              className='min-h-[5rem]'
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="pitch_solution">Pitch Solution</label>
            <Input
              id="pitch_solution"
              name="pitch_solution"
              type='textarea'
              value={business.pitch_solution}
              onChange={handleInputChange}
              placeholder='e.g Our AI-powered platform democratizes access to advanced data ...'
              className='min-h-[5rem]'
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="pitch_market_opportunity">Pitch Market Opportunity</label>
            <Input
              id="pitch_market_opportunity"
              name="pitch_market_opportunity"
              type='textarea'
              value={business.pitch_market_opportunity}
              onChange={handleInputChange}
              placeholder='e.g The global AI market is projected to grow from $387.45 ...'
              className='min-h-[5rem]'
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="pitch_traction">Pitch Traction</label>
            <Input
              id="pitch_traction"
              name="pitch_traction"
              type='textarea'
              value={business.pitch_traction}
              onChange={handleInputChange}
              placeholder='e.g In our first year, we&apos;ve onboarded 50+ clients across ...'
              className='min-h-[5rem]'
              required
            />
          </div>

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
            <div className="flex flex-col space-y-2">
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="amount_raised">Amount Raised ($)</label>
              <Input
                type="number"
                id="amount_raised"
                name="amount_raised"
                value={business.amount_raised}
                onChange={handleNumberChange}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="investors">Number of Investors</label>
              <Input
                type="number"
                id="investors"
                name="investors"
                value={business.investors}
                onChange={handleNumberChange}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="minimum_investment">Minimum Investment ($)</label>
              <Input
                type="number"
                id="minimum_investment"
                name="minimum_investment"
                value={business.minimum_investment}
                onChange={handleNumberChange}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="days_left">Days Left</label>
              <Input
                type="number"
                id="days_left"
                name="days_left"
                value={business.days_left}
                onChange={handleNumberChange}
                required
              />
            </div>
          </div>

          {/* ::::::::::::::::::::: SUBMIT BUTTON */}
          <button 
            type="submit" 
            className="w-full bg-neutral-800 text-neutral-100 font-[600] text-[0.875rem] px-[2rem] py-[0.875rem] rounded-[8px] outline outline-1 outline-neutral-300 hover:bg-neutral-100 hover:text-neutral-800 active:bg-neutral-200 shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] ease-250"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </MainLayout>
  )
}