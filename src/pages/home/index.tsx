import { useEffect, useState, useRef } from 'react';
import MainLayout from '$/layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from '$/components/ui/skeleton';
import BusinessCard from '$/components/businessCard';

interface Business {
  id: string
  logo: string
  cover_image: string

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

const data = [
  {
    title: 'Empowering African Entreprenuers',
    subtitle: 'Using blockchain technology, African small business can access capital.'
  },
  {
    title: 'Unlocking Financial inclusion',
    subtitle: 'Participate in the digital economy easily by empowering undeserved communities.'
  },
  {
    title: 'Seamless crowdfunding for Growth',
    subtitle: 'Support innovative venture with secure, transparent, and decentralized funding opportunities.'
  },
  {
    title: 'Transparency  You Can Trust',
    subtitle: 'Ensure your support matters with a crowdfunding platform built on integrity. Every contribution is tracked.'
  },
  {
    title: 'Investing in Tomorrow',
    subtitle: 'Join us in sharing a brighter future for Africa by promoting sustainable growth for generations to come.'
  }
]

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      const scrollContent = scrollContainer.querySelector('div')
      if (scrollContent) {
        scrollContainer.appendChild(scrollContent.cloneNode(true))
      }
    }
  }, []);

  // ::::::::::::::::::::: fetching all businesses
  const [businesses, setBusinesses] = useState<Business[]>([]); 

  const backend_url = import.meta.env.VITE_APP_BACKEND_URL;
  
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(`${backend_url}/businesses/`);
        setBusinesses(response.data);
        console.log('businesses: ', response.data);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchBusinesses();
  }, []);
  
  return (
    <MainLayout>
      <div className='flex size-full flex-col space-y-[4rem] items-center justify-center py-[4rem] md:py-[6rem] px-[1rem] bg-neutral-100 '>
        <div className='flex flex-col md:items-center w-full max-w-[72rem] space-y-[2rem] md:text-center'>
          <h1 className='text-[2.25rem] sm:text-[2.875rem] smd:text-[3rem] lg:text-[3.25rem] font-[700]'>Fuel Africa&apos;s Innovation 
            <p className='bg-gradient-to-r from-primary-600 via-purple-600 to-red-500 text-transparent bg-clip-text text-clip'>Support Local Entrepreneurs Today</p>
          </h1>
          <p className='text-[0.875rem] lg:text-[1.15rem] text-neutral-800 max-w-[50rem] mx-auto '>Support Local African entrepreneurs and ignite a wave of innovation that transforms lives. Your contribution empowers small businesses, creating lasting change in communities. Together, we can fuel Africa's future today!</p>

          <div className='flex gap-[1rem] items-center'>
            <Link 
              to='/'
              className='flex w-[10rem] py-[0.875rem] justify-center text-center text-[1rem] px-[1rem] rounded-[8px] text-white font-[600] bg-primary-600 hover:bg-primary-700 active:bg-priamry-500 ease-250'
            >View Deals</Link>
            <Link 
              to='/'
              className='flex w-[10rem] py-[0.875rem] justify-center text-center text-[1rem] px-[1rem] rounded-[8px] font-[600] outline outline-[1px] outline-neutral-400 hover:outline-[1px] hover:outline-primary-600 hover:text-primary-600 active:bg-primary ease-250'
            >Raise Capital</Link>
          </div>

          <small>Private investments are highly risky, illiquid and may result in total loss of capital. <a href='#' className='underline'>Learn more</a></small>
        </div>
        
        {/* ::::::::::::::::::: carousel */}
        <div className="w-full overflow-hidden bg-white p-4">
          <div
            ref={scrollRef}
            className={`flex animate-scroll ${isPaused && 'animate-pause'}`}
            style={{
              width: 'calc(25rem * 10)',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex">
              {data.map((item, i) => (
                <div key={i} className="relative w-[25rem] h-[19rem] flex flex-col text-start justify-end flex-shrink-0 mx-[1rem] rounded-[8px] overflow-hidden">
                  <img
                    src={`/images/hero${i+1}.jpg`}
                    alt={`Image ${i+1}`}
                    className="absolute left-0 top-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90"></div>
                  <div className="relative z-10 p-[1rem]">
                    <h3 className='text-white text-[1.25rem] font-[600]'>{item.title}</h3>
                    <p className='text-white text-[0.875rem]'>{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ::::::::::::::::::: companies */}
        <div className='w-full max-w-[72rem] '>
          <h3 className='text-[1.5rem] font-[600]'>Top Businesses</h3>
          <p className='text-[0.75rem] text-neutral-500 mb-[1rem] '>Only public open business are shown. Log in to see all businesses you’re eligible to invest in</p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-[0.5rem] gap-y-[2rem] lg:gap-[2rem]'>
          {(businesses.length > 0 )?
            <>
            {businesses.slice(0,3)?.map((business, i) => (
              <BusinessCard business={business} key={i} />
            ))}
            </> :
            (<>
              {[1,2,3].map((_, i) => (
                <div
                  key={i}
                  className='group relative flex flex-col space-y-[1rem] h-[22.5rem] lg:h-[31.25rem] w-full rounded-[16px] overflow-hidden shadow-[0_2px_5px_-2px_rgba(0,0,0,0.25)] '
                >
                  <Skeleton className='w-full h-[13rem] lg:h-[15.625rem] rounded-t-[16px]' />
                  <Skeleton className='w-full h-[3rem] lg:h-[1.625rem]' />
                  <Skeleton className='w-full h-[1rem] lg:h-[1.625rem]' />
                  <Skeleton className='w-full h-[1rem] lg:h-[1.625rem]' />
                </div>
              ))}
            </>)
          }
        </div>
        </div>
          <Link 
            className='w-full max-w-[15rem] py-[0.5rem] font-[600] text-[0.875rem] mx-auto text-center rounded-[8px] outline outline-[1px] outline-neutral-300 hover:bg-neutral-200/50 active:outline-primary-500 active:text-primary-600 ease-250'
            to='/business'
          >View All</Link>
      </div>
    </MainLayout>
  )
}

export default Home;