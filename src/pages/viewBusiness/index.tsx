import { useEffect, useState } from 'react';
import { FaRegClock, FaCheckCircle } from 'react-icons/fa';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '$/components/ui/accordion';
import MainLayout from '$/layout';
import Modal from './components/modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '$/components/loader';

interface Business {
  id: string;
  logo: string;
  cover_image: string;
  name: string;
  short_description: string;
  location: string;
  category: string;
  minimum_investment: number;
  days_left: number;
  amount_raised: number;
  investors: number;
  pitch_summary: string;
  pitch_problem: string;
  pitch_solution: string;
  pitch_market_opportunity: string;
  pitch_traction: string;
}

export default function BusinessPage() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { id } = useParams();  // Extract the business id from the URL params
  const backend_url = import.meta.env.VITE_APP_BACKEND_URL;  // Environment variable for backend URL

  // Fetch the business data based on the business ID
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await axios.get(`${backend_url}/businesses/${id}`); 
        setBusiness(response.data); 
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };

    if (id) {
      fetchBusiness(); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); 

  if (!business) {
    return <Loader />; 
  }

  const modalData = {
    name: business.name,
    minimum_investment: business.minimum_investment,
  };

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
                  className="object-cover"
                />
              </div>
              <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Pitch</h2>
                <p className="text-neutral-600 mb-4">{business.pitch_summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-neutral-100 text-neutral-600 tracking-wide px-3 py-1 rounded-full text-[0.875rem] uppercase font-[600] ">
                    {business.category}
                  </span>
                  <span className="bg-neutral-100 text-neutral-600 tracking-wide px-3 py-1 rounded-full text-[0.875rem] uppercase font-[600] ">
                    {business.location}
                  </span>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="summary">
                    <AccordionTrigger>Summary</AccordionTrigger>
                    <AccordionContent>{business.pitch_summary}</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="problem">
                    <AccordionTrigger>Problem</AccordionTrigger>
                    <AccordionContent>{business.pitch_problem}</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="solution">
                    <AccordionTrigger>Solution</AccordionTrigger>
                    <AccordionContent>{business.pitch_solution}</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="market_opportunity">
                    <AccordionTrigger>Market Opportunity</AccordionTrigger>
                    <AccordionContent>{business.pitch_market_opportunity}</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="traction">
                    <AccordionTrigger>Traction</AccordionTrigger>
                    <AccordionContent>{business.pitch_traction}</AccordionContent>
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
                    <span>{business.days_left} days left</span>
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
                    <p className="font-bold text-lg">{business.investors}</p>
                  </div>
                </div>

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
                  This offering has been verified by AfriSeed plc. Investors should review all offering documents before investing.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* :::::::::::::::::::: investment modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        business={modalData}
      />
    </MainLayout>
  );
}
