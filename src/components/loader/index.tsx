import './style.css';

const Loader = () => {
  return (
    <div className='flex place-items-center size-full min-h-screen min-w-screen bg-gradient-to-br from-neutral-500 via-purple-700 to-primary-950'>
      <div className="banter-loader">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
      </div>

      <p className='uppercase font-[600] text-[0.875rem] text-white text-center mx-auto mt-[8rem] '>Loading...</p>
    </div>
  )
}

export default Loader;