// import { useState } from 'react';
import { FaRegClock, FaCheckCircle } from 'react-icons/fa';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "$/components/ui/accordion";
import MainLayout from '$/layout';

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

const business: Business = {
  id: '1',
  name: 'TechInnovate',
  logo: '/images/hero3.jpg',
  coverImage: '/images/hero1.jpg',
  shortDescription: 'AI-powered solutions for businesses',
  pitch: {
    summary: 'TechInnovate is revolutionizing the way businesses interact with data, providing scalable and efficient AI and machine learning solutions for companies of all sizes.',
    problem: 'Many businesses struggle to effectively utilize their data due to lack of expertise and resources in AI and machine learning.',
    solution: 'Our AI-powered platform democratizes access to advanced data analytics, making it easy for businesses of all sizes to gain valuable insights and automate decision-making processes.',
    marketOpportunity: 'The global AI market is projected to grow from $387.45 billion in 2022 to $1,394.30 billion in 2029, at a CAGR of 20.1%.',
    businessModel: 'We operate on a SaaS model with tiered pricing based on data volume and complexity of AI models. We also offer consulting services for enterprise clients.',
    traction: "In our first year, we've onboarded 50+ clients across various industries, achieving a 95% retention rate and $2M in ARR."
  },
  location: 'Nairobi, Kenya',
  category: 'Technology',
  amountRaised: 100000,
  investors: 122,
  valuation: '$5M',
  minimumInvestment: 100,
  daysLeft: 15,
}

export default function BusinessPage() {
  // const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

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
                <p className="text-sm text-neutral-500">{business.shortDescription}</p>
              </div>
            </div>
            <button className="bg-neutral-800 text-neutral-100 font-[600] text-[0.875rem] px-[2rem] py-[0.5rem] rounded-full outline outline-1 outline-neutral-300 hover:bg-neutral-100 hover:text-neutral-800 active:bg-neutral-200 shadow-[0_0_20px_1px_rgba(0,0,0,0.1)] ease-250">
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
                  src={business.coverImage}
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
                  <AccordionItem value="marketOpportunity">
                    <AccordionTrigger>Market Opportunity</AccordionTrigger>
                    <AccordionContent>
                      {business.pitch.marketOpportunity}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="businessModel">
                    <AccordionTrigger>Business Model</AccordionTrigger>
                    <AccordionContent>
                      {business.pitch.businessModel}
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

                <p className="text-3xl font-bold mb-2">${business.amountRaised.toLocaleString()}</p>
                
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
                >
                  Invest Now
                </button>
                <p className="text-center text-neutral-600 mt-[1rem] ">
                  ${business.minimumInvestment} minimum investment
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

        {/* Video Modal */}
        {/* {isVideoModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
              <div className="flex justify-end mb-2">
                <button onClick={() => setIsVideoModalOpen(false)} className="text-neutral-600 hover:text-neutral-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </MainLayout>
  )
}