import { Link } from 'react-router-dom';
import { RiSearch2Line } from "react-icons/ri";

const Navbar = () => {
  return (
    <header className='flex justify-center w-full'>
      <nav className='flex place-items-center gap-x-[2rem] w-full max-w-[72rem] h-[4.5rem] '>
        <img src='/assets/vite.svg' alt='LOGO' className='' />

        <div className='flex items-center space-x-[2rem] h-full '>
          
            <Link 
              to='/investors'
              className='flex items-center h-full text-center hover:text-primary-600 border-solid border-0 hover:border-primary-600 hover:border-b-[2px] ease-250'
            >Investors</Link>
            <Link 
              to='/business'
              className='flex items-center h-full text-center hover:text-primary-600 border-solid border-0 hover:border-primary-600 hover:border-b-[2px] ease-250'
            >Business</Link>
          
          <div className='relative size-max flex place-items-center '>
            <RiSearch2Line className='absolute left-[1rem] text-[1.25rem] text-neutral-500 ' />
            <input 
              type='text' 
              className='max-w-[12.5rem] h-[2.5rem] pl-[2.5rem] p-[1rem] rounded-[6.25rem] bg-neutral-100' 
              placeholder='Search'
            />
          </div>
          
        </div>
      </nav>
    </header>
  )
}

export default Navbar