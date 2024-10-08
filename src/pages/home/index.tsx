import MainLayout from '$/layout'

const Home = () => {
  return (
    <MainLayout>
      <div className='flex size-full justify-center py-[4rem] lg:py-[6rem] px-[1rem] '>
        <div className='w-full max-w-[72rem] space-y-[2rem] text-center'>
          <h1 className='text-[3rem] lg:text-[3.25rem] font-[700]'>Fuel Africa&apos;s Innovation 
            <p className='bg-gradient-to-r from-primary-600 via-purple-600 to-red-500 text-transparent bg-clip-text text-clip'>Support Local Entrepreneurs Today</p>
          </h1>
          <p className='text-[1.15rem] text-neutral-800 max-w-[50rem] mx-auto '>Support Local African entrepreneurs and ignite a wave of innovation that transforms lives. Your contribution empowers small businesses, creating lasting change in communities. Together, we can fuel Africa's future today!</p>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home;