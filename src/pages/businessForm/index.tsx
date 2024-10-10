import MainLayout from '$/layout';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Input from "$/components/input";
import { RiImageAddLine } from "react-icons/ri";
// import { Textarea } from "$/components/ui/textarea"
// import { Label } from "$/components/ui/label"
// import { Button } from "$/components/ui/button"

interface Business {
  id: string
  name: string
  logo: string
  coverImage: string
  shortDescription: string
  pitch: {
    summary: string
    problem: string
    solution: string
    marketOpportunity: string
    competitive: string
    businessModel: string
    traction: string
  }
  location: string
  category: string
  amountRaised: number
  investors: number
  minimumInvestment: number
  daysLeft: number
}

const initialBusiness: Business = {
  id: '1',
  name: '',
  logo: '',
  coverImage: '',
  shortDescription: '',
  pitch: {
    summary: '',
    problem: '',
    solution: '',
    marketOpportunity: '',
    competitive: '',
    businessModel: '',
    traction: '',
  },
  location: '',
  category: '',
  amountRaised: 0,
  investors: 0,
  minimumInvestment: 0,
  daysLeft: 0,
}

export default function BusinessForm() {
  const [business, setBusiness] = useState<Business>(initialBusiness)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusiness(prev => ({ ...prev, [name]: value }))
  }

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusiness(prev => ({
      ...prev,
      pitch: { ...prev.pitch, [name]: value }
    }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusiness(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
  }

  const onDrop = useCallback((acceptedFiles: File[], type: 'logo' | 'coverImage') => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBusiness(prev => ({ ...prev, [type]: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
    onDrop: (files: File[]) => onDrop(files, 'logo'),
    accept: { 'image/*': [] },
    multiple: false
  })

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({
    onDrop: (files: File[]) => onDrop(files, 'coverImage'),
    accept: { 'image/*': [] },
    multiple: false
  })

  // :::::::::::::::::::: submit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', business)
  }

  return (
    <MainLayout>
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
                {business.logo ? (
                  <img src={business.logo} alt="Logo" className="size-[12.5rem] rounded-[4px] object-cover mb-4" />
                ) : (
                  <RiImageAddLine className='text-[3.5rem] text-neutral-400' />
                )}
                <p className="text-sm text-gray-500">Drag and drop or click to upload logo</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase'>Cover Image</label>
            <div {...getCoverRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-neutral-500">
              <input {...getCoverInputProps()} />
              <div className="flex flex-col items-center">
                {business.coverImage ? (
                  <img src={business.coverImage} alt="Cover" className="size-[12.5rem] rounded-[4px] mb-4 object-cover" />
                ) : (
                  <RiImageAddLine className='text-[3.5rem] text-neutral-400' />
                )}
                <p className="text-sm text-gray-500">Drag and drop or click to upload cover image</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="shortDescription">Short Description</label>
            <Input
              id="shortDescription"
              name="shortDescription"
              value={business.shortDescription}
              onChange={handleInputChange}
              placeholder='e.g AI-powered software as a service aimed at ...'
              required
            />
          </div>

          <div className="space-y-2">
            <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="summary">Pitch Summary</label>
            <Input
              id="summary"
              name="summary"
              type='textarea'
              value={business.pitch.summary}
              onChange={handlePitchChange}
              placeholder='e.g In summary, this aims to not only empower users but improve the quality of ...'
              className='min-h-[5rem]'
              required
            />
          </div>

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

          <div className="grid grid-cols-1 smd:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="amountRaised">Amount Raised ($)</label>
              <Input
                type="number"
                id="amountRaised"
                name="amountRaised"
                value={business.amountRaised}
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
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="minimumInvestment">Minimum Investment ($)</label>
              <Input
                type="number"
                id="minimumInvestment"
                name="minimumInvestment"
                value={business.minimumInvestment}
                onChange={handleNumberChange}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className='text-[0.875rem] font-[600] text-neutral-600 uppercase' htmlFor="daysLeft">Days Left</label>
              <Input
                type="number"
                id="daysLeft"
                name="daysLeft"
                value={business.daysLeft}
                onChange={handleNumberChange}
                required
              />
            </div>
          </div>

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