import MainLayout from '$/layout'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <MainLayout>
      <div className='flex size-full justify-center py-[4rem] lg:py-[6rem] px-[1rem] '>
        <div className='flex flex-col md:items-center w-full max-w-[72rem] space-y-[2rem] md:text-center'>
          <h1 className='text-[3rem] lg:text-[3.25rem] font-[700]'>Fuel Africa&apos;s Innovation 
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
        
      </div>
    </MainLayout>
  )
}

export default Home;