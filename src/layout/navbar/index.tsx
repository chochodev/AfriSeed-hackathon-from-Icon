import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiSearch2Line, RiMenu5Fill, RiCloseFill } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
import { ConnectWallet } from '@thirdweb-dev/react';

const Navbar = () => {
  const [smallScreen, setSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const body = document.querySelector('body');

    if (body) {
      body.style.overflow = smallScreen? 'hidden' : 'auto';
    }
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSmallScreen(window.innerWidth <= 768);
      }
    };

    window.addEventListener('resize', handleResize);

    // ::::::::::::::::::::::::: Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [smallScreen])

  return (
    <header className='relative flex justify-center w-full px-[1rem]'>
      <nav className='flex place-items-center max-lg:justify-between gap-x-[2rem] w-full max-w-[72rem] h-[4.5rem] '>
        <Link to='/' className='flex items-center gap-[0.25rem]'>
          <img src='/logo.svg' alt='LOGO' className='size-[3.25rem] lg:size-[4rem]' />
          <h2 className='text-[1.5rem] font-bold'>AfriSeed</h2>
        </Link>

        {/* ::::::::::::::::::::::: small screen nav button */}
        <button 
          className='block md:hidden hover:text-primary-900 hover:bg-primary ease-250 rounded-[4px] '
          onClick={()=>setSmallScreen(!smallScreen)}
        >
          {!smallScreen? 
          <RiMenu5Fill className='text-[1.875rem] m-[0.25rem] ' /> :
          <RiCloseFill className='text-[1.875rem] m-[0.25rem] ' />}
        </button>

        {/* ::::::::::::::::::::::: large screen nav section */}
        <div className='hidden md:flex flex-1 items-center justify-between space-x-[2rem] h-full w-full '>
          <div className='flex items-center space-x-[1.5rem] lg:space-x-[2rem] h-full '>
            {/* ::::::::::::::::::::::: nav links */}
            <Link 
              to='/investors'
              className='flex items-center h-full text-center hover:text-primary-600 border-solid border-0 border-b-2 border-transparent hover:border-primary-600 ease-250'
            >Investors</Link>
            <Link 
              to='/business'
              className='flex items-center h-full text-center hover:text-primary-600 border-solid border-0 border-b-2 border-transparent hover:border-primary-600 ease-250'
            >Businesses</Link>
            
            <div className='relative size-max flex place-items-center '>
              <RiSearch2Line className='absolute left-[1rem] text-[1.25rem] text-neutral-500 ' />
              <input 
                type='text' 
                className='max-w-[10rem] lg:max-w-[12.5rem] h-[2.5rem] pl-[2.5rem] p-[1rem] rounded-[6.25rem] bg-neutral-100 outline outline-1 outline-transparent focus:outline-neutral-200 ease-250' 
                placeholder='Search'
              />
            </div>
          </div>
          
          <div className='flex justify-end'>
            <ConnectWallet 
              style={{
                fontSize: '0.875rem',
                padding: '0.75rem 1rem'
              }}
              theme={'light'}
            />
          </div>
        </div>
      </nav>

      {/* :::::::::::::::::: small screen nav content */}
      {smallScreen && 
      <div 
        className='absolute z-[100] top-[100%] left-0 flex flex-col flex-1 space-y-[8rem] bg-neutral-50 min-h-screen w-full p-[2rem]'
      >
        <div className='flex flex-col space-y-[2rem] '>          
          <div className='relative size-max flex place-items-center '>
            <RiSearch2Line className='absolute left-[1rem] text-[1.25rem] text-neutral-500 ' />
            <input 
              type='text' 
              className='max-w-[20rem] h-[2.5rem] pl-[2.5rem] p-[1rem] rounded-[6.25rem] bg-neutral-100 outline outline-1 outline-transparent focus:outline-neutral-300 ease-250' 
              placeholder='Search'
            />
          </div>

          {/* ::::::::::::::::::::::: nav links */}
          <Link 
            to='/investors'
            className='group flex items-center h-full ml-[1rem] font-[600] text-center text-[1.25rem] hover:text-primary-600 ease-250'
          >Investors <BsArrowRight className='text-[1rem] translate-x-[-0.5rem] opacity-0 text-primary-600 group-hover:translate-x-[0.5rem] group-hover:opacity-100 ease-250' /></Link>
          <Link 
            to='/business'
            className='group flex items-center h-full ml-[1rem] font-[600] text-center text-[1.25rem] hover:text-primary-600 ease-250'
          >Businesses <BsArrowRight className='text-[1rem] translate-x-[-0.5rem] opacity-0 text-primary-600 group-hover:translate-x-[0.5rem] group-hover:opacity-100 ease-250' /></Link>
        </div>
        
        <div className='flex justify-center'>
          <ConnectWallet 
            style={{
              width: "100%",
            }}
            theme={'light'}
          />
        </div>
      </div>}
    </header>
  )
}

export default Navbar