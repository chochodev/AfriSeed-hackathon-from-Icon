import MainLayout from '$/layout';
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
// import { Input } from "$/components/ui/input"
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
  valuation: string
  minimumInvestment: number
  daysLeft: number
}

const initialBusiness: Business = {
  id: '1',
  name: 'TechInnovate',
  logo: '/images/hero3.jpg',
  coverImage: '/images/hero1.jpg',
  shortDescription: 'AI-powered solutions for businesses',
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
  valuation: '',
  minimumInvestment: 0,
  daysLeft: 0,
}

export default function BusinessForm() {
  const [business, setBusiness] = useState<Business>(initialBusiness)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusiness(prev => ({ ...prev, [name]: value }))
  }

  const handlePitchChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusiness(prev => ({
      ...prev,
      pitch: { ...prev.pitch, [name]: value }
    }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', business)
    // Here you would typically send the data to your backend
  }

  return (
    <MainLayout>
    <div className='size-full py-[4rem] px-[1rem] lg:px-[2rem] bg-neutral-50'>
      <div className="max-w-[72rem] mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pitch Your Business Ideas</h1>
        <p className='text-[1rem] font-[600] text-neutral-600'>Instructions</p>
        <p className='text-[0.875rem] text-neutral-500 font-[600] pl-[1rem]'>
        1. Fill out the form truthfully.<br/>
        2. Submit your application for review.<br/>
        3. Once approved, your business will be visible to all investors.
        </p> 

        {/* ::::::::::::::::::::::::::::::: form */}
        <form onSubmit={handleSubmit} className="space-y-[1rem]">
          <div className="space-y-2">
            <label htmlFor="name">Business Name</label>
            <input
              id="name"
              name="name"
              value={business.name}
              onChange={handleInputChange}
              className=''
              required
            />
          </div>

          <div className="space-y-2">
            <label>Logo</label>
            <div {...getLogoRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-primary-500">
              <input {...getLogoInputProps()} />
              <div className="flex flex-col items-center">
                {business.logo ? (
                  <img src={business.logo} alt="Logo" className="size-[6.25rem] object-cover mb-4" />
                ) : (
                  <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                )}
                <p className="text-sm text-gray-500">Drag and drop or click to upload logo</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label>Cover Image</label>
            <div {...getCoverRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-primary-500">
              <input {...getCoverInputProps()} />
              <div className="flex flex-col items-center">
                {business.coverImage ? (
                  <img src={business.coverImage} alt="Cover" className="size-[12.5rem] mb-4 object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                )}
                <p className="text-sm text-gray-500">Drag and drop or click to upload cover image</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="shortDescription">Short Description</label>
            <input
              id="shortDescription"
              name="shortDescription"
              value={business.shortDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="summary">Pitch Summary</label>
            <textarea
              id="summary"
              name="summary"
              value={business.pitch.summary}
              onChange={handlePitchChange}
              rows={3}
              required
            ></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              value={business.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              name="category"
              value={business.category}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="amountRaised">Amount Raised</label>
              <input
                type="number"
                id="amountRaised"
                name="amountRaised"
                value={business.amountRaised}
                onChange={handleNumberChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="investors">Number of Investors</label>
              <input
                type="number"
                id="investors"
                name="investors"
                value={business.investors}
                onChange={handleNumberChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="valuation">Valuation</label>
              <input
                id="valuation"
                name="valuation"
                value={business.valuation}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="minimumInvestment">Minimum Investment</label>
              <input
                type="number"
                id="minimumInvestment"
                name="minimumInvestment"
                value={business.minimumInvestment}
                onChange={handleNumberChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="daysLeft">Days Left</label>
              <input
                type="number"
                id="daysLeft"
                name="daysLeft"
                value={business.daysLeft}
                onChange={handleNumberChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
    </MainLayout>
  )
}