import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='flex place-center'>
      <nav className='flex items-center max-w-[72rem] h-[4.5rem] '>
        <img src='/assets/vite.svg' alt='LOGO' className='' />

        <div className=''>
          <Link to='/investors'>Investors</Link>
          <Link to='/business'>Business</Link>
          <input type='color' className='' placeholder=''/>
        </div>
      </nav>
    </header>
  )
}

export default Navbar