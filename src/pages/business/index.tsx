import MainLayout from '$/layout';

const Business = () => {
  return (
    <MainLayout>
      <div className='flex size-full flex-col space-y-[4rem] items-center justify-center py-[3rem] md:py-[6rem] px-[1rem] lg:px-[2rem] bg-neutral-100 '>
        <div className='w-full max-w-[72rem]'>     
          <h2 className='text-[2rem] lg:text-[2.5rem] font-[800] '>Investment opportunities</h2>
          <p className='text-[1rem] text-neutral-500'>Browse current investment opportunities on Republic.<br/>
          All companies are vetted & pass due diligence.</p>

          <div>
            
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Business;