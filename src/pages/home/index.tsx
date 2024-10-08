import { useEffect, useRef } from 'react';
import MainLayout from '$/layout';
import { Link } from 'react-router-dom';

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
        <div className="w-full overflow-hidden bg-gray-100 p-4">
          <div
            ref={scrollRef}
            className="flex animate-scroll overflow-hidden"
            style={{
              width: 'calc(20rem * 10)',
            }}
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="relative size-[20rem] flex-shrink-0 mx-2">
                  <img
                    src={`/images/hero${num}.jpg`}
                    alt={`Image ${num}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
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