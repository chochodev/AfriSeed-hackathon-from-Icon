import { Link } from 'react-router-dom';
import { RiSearch2Line } from "react-icons/ri";

const Navbar = () => {
  return (
    <header className='flex place-center'>
      <nav className='flex items-center max-w-[72rem] h-[4.5rem] '>
        <img src='/assets/vite.svg' alt='LOGO' className='' />

        <div className=''>
          <Link to='/investors'>Investors</Link>
          <Link to='/business'>Business</Link>
          
          <div className='relative size-max flex place-center '>
            <RiSearch2Line className='absolute left-[1rem] text-[1rem] ' />
            <input 
              type='text' 
              className='max-w-[12.5rem] h-[2.5rem] p-[1rem] rounded-[6.25rem] bg-green-500' 
              placeholder='Search'
            />
          </div>
          
        </div>
      </nav>
    </header>
  )
}

export default Navbar