import { useState } from 'react';
import { FaRegClock, FaCheckCircle } from 'react-icons/fa';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "$/components/ui/accordion";
import MainLayout from '$/layout';
import Modal from './components/modal';

interface Business {
  name: string
  logo: string
  cover_image: string
  short_description: string
  pitch: {
    summary: string
    problem: string
    solution: string
    market_opportunity: string
    traction: string
  }
  location: string
  category: string
  amount_raised: number
  investors: number
  valuation: string
  minimum_investment: number
  daysLeft: number
}

const business: Business = {
  name: 'TechInnovate',
  logo: '/images/hero3.jpg',
  cover_image: '/images/hero1.jpg',
  short_description: 'AI-powered solutions for businesses',
  pitch: {
    summary: 'TechInnovate is revolutionizing the way businesses interact with data, providing scalable and efficient AI and machine learning solutions for companies of all sizes.',
    problem: 'Many businesses struggle to effectively utilize their data due to lack of expertise and resources in AI and machine learning.',
    solution: 'Our AI-powered platform democratizes access to advanced data analytics, making it easy for businesses of all sizes to gain valuable insights and automate decision-making processes.',
    market_opportunity: 'The global AI market is projected to grow from $387.45 billion in 2022 to $1,394.30 billion in 2029, at a CAGR of 20.1%.',
    traction: "In our first year, we've onboarded 50+ clients across various industries, achieving a 95% retention rate and $2M in ARR."
  },
  location: 'Nairobi, Kenya',
  category: 'Technology',
  amount_raised: 100000,
  investors: 122,
  valuation: '$5M',
  minimum_investment: 100,
  daysLeft: 15,
}

export default function BusinessPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const modalData = {
    name: business.name,
    minimum_investment: business.minimum_investment
  }

  return (
    <MainLayout>
      <div className="bg-neutral-50 min-h-screen">
        {/* ::::::::::::::::::::::::::: header */}
        <header className="">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src={business.logo}
                alt={`${business.name} logo`}
                className="size-[2.5rem] object-cover rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold">{business.name}</h1>
                <p className="text-sm text-neutral-500">{business.short_description}</p>
              </div>
            </div>
            <button 
              className="bg-neutral-800 text-neutral-100 font-[600] text-[0.875rem] px-[2rem] py-[0.5rem] rounded-full outline outline-1 outline-neutral-300 hover:bg-neutral-100 hover:text-neutral-800 active:bg-neutral-200 shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] ease-250"
              onClick={openModal}
            >
              Invest Now
            </button>
          </div>
        </header>

        {/* :::::::::::::::::::::::::::::::: Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ::::::::::::::::::::::::::::::: Left Column */}
            <div className="lg:col-span-2">
              <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
                <img
                  src={business.cover_image}
                  alt={`${business.name} cover`}
                  className='object-cover '
                />
                <button 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white"
                  // onClick={() => setIsVideoModalOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Pitch</h2>
                <p className="text-neutral-600 mb-4">{business.pitch.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-sm">
                    {business.category}
                  </span>
                  <span className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-sm">
                    {business.location}
                  </span>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="problem">
                    <AccordionTrigger>Summary</AccordionTrigger>
                    <AccordionContent>
                      {business.pitch.summary}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="problem">
                    <AccordionTrigger>Problem</AccordionTrigger>
                    <AccordionContent>
                      {business.pitch.problem}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="solution">
                    <AccordionTrigger>Solution</AccordionTrigger>
                    <AccordionContent>
                      {business.pitch.solution}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="market_opportunity">
                    <AccordionTrigger>Market Opportunity</AccordionTrigger>
                    <AccordionContent>
                      {business.pitch.market_opportunity}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="traction">
                    <AccordionTrigger>Traction</AccordionTrigger>
                    <AccordionContent>
                      {business.pitch.traction}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* :::::::::::::::::::::::::::::::: Right Column */}
            <div>
              <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Funding Progress</h3>
                  <div className="flex items-center text-neutral-500">
                    <FaRegClock className="mr-1" />
                    <span>{business.daysLeft} days left</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="h-2 bg-neutral-200 rounded-full">
                    <div className="h-2 bg-neutral-800 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>

                <p className="text-3xl font-bold mb-2">${business.amount_raised.toLocaleString()}</p>
                
                <p className="text-neutral-600 mb-6">raised of $250,000 goal</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-neutral-600 text-sm">Investors</p>
                    <p className="font-bold text-lg">{business.investors}</p>
                  </div>
                  <div>
                    <p className="text-neutral-600 text-sm">Valuation</p>
                    <p className="font-bold text-lg">{business.valuation}</p>
                  </div>
                </div>

                {/* ::::::::::::::::::::: invest now button */}
                <button 
                  className="w-full bg-neutral-800 text-neutral-100 font-[600] py-[0.875rem] rounded-full outline outline-1 outline-neutral-300 hover:bg-neutral-100 hover:text-neutral-800 active:bg-neutral-200 shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] ease-250"
                  onClick={openModal}
                >
                  Invest Now
                </button>
                <p className="text-center text-neutral-600 mt-[1rem] ">
                  ${business.minimum_investment} minimum investment
                </p>
              </div>
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <div className="flex items-center text-green-600 mb-4">
                  <FaCheckCircle className="mr-2" />
                  <span className="font-semibold">Verified by AfriSeed plc</span>
                </div>
                <p className="text-neutral-600 text-sm">
                  This offering has been verified by AfriSeed plc. Investors should review all offering materials and conduct their own due diligence.
                </p>
              </div>
            </div>
          </div>
        </main>        
        
        {/* :::::::::::::::::::: investment modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          business={modalData}
        />

      </div>
    </MainLayout>
  )
}