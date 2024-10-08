import { useEffect, useState, useRef } from 'react';
import MainLayout from '$/layout';
import { Link } from 'react-router-dom';

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
      </div>
    </MainLayout>
  )
}

export default Home;