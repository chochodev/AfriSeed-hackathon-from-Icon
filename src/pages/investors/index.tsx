import { useEffect, useState } from 'react';
import InvestorCard from '$/components/investorCard';
import MainLayout from '$/layout';
import { RiSearch2Line, RiArrowDownSLine } from "react-icons/ri";

// interface Item {
//   name: string
//   verified: boolean
// }

const options = [
  { value: "all", label: "All" },
  { value: "verified", label: "Verified" },
]

const Investors = () => {
  const [value, setValue] = useState<string>("all")
  // const [filteredItems, setFilteredItems] = useState<Item[]>(items)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSelect = (currentValue: string) => {
    setValue(currentValue)
    setIsOpen(false)
    // if (currentValue === "all") {
    //   setFilteredItems(items)
    // } else if (currentValue === "verified") {
    //   setFilteredItems(items.filter(item => item.verified))
    // } else {
    //   setFilteredItems(items.filter(item => !item.verified))
    // }
  }

  useEffect(() => {
    const button = document.getElementById('filter-button');

    if (button) {
      button.addEventListener('blur', ()=>setIsOpen(!isOpen));
    }

    // :::::::::::::::::::: cleanup function 
    return () => {
      if (button) {
        button.removeEventListener('blur', ()=>setIsOpen(!isOpen));
      }
    };
  }, [isOpen]);

  return (
    <MainLayout>
      <div className='flex size-full flex-col space-y-[4rem] items-center justify-center py-[3rem] md:py-[6rem] px-[1rem] lg:px-[2rem] bg-neutral-100 '>
        <div className='w-full max-w-[72rem]'>     
          <h2 className='text-[2rem] lg:text-[2.5rem] font-[800] '>Investment opportunities</h2>
          <p className='text-[1rem] text-neutral-500'>Browse to contact possible investors for your business.<br/>
          All investors are vetted & pass due diligence.</p>

          <nav className='flex items-center space-x-[2rem] w-full py-[2rem] '>
            {/* :::::::::::::::::::::::::: search */}
            <div className='relative size-max flex place-items-center '>
              <RiSearch2Line className='absolute left-[1rem] text-[1.25rem] text-neutral-500 ' />
              <input 
                type='text' 
                className='max-w-[10rem] lg:max-w-[12.5rem] h-[2.5rem] pl-[2.5rem] p-[1rem] rounded-[6.25rem] bg-white outline outline-1 outline-neutral-200 focus:outline-neutral-400 ease-250' 
                placeholder='Search'
              />
            </div>

            {/* ::::::::::::::::::::::::: filter */}
            <div className="w-full max-w-[10rem] space-y-4">
              <div className="relative">
                <button
                  className="w-full flex justify-between items-center px-4 py-2 text-left bg-white border-solid border-[1px] border-neutral-200 rounded-[1rem] focus:outline-none focus:border-neutral-400"
                  onClick={() => setIsOpen(!isOpen)}
                  id='filter-button'
                >
                  {options.find(option => option.value === value)?.label || "Select filter"}
                  <RiArrowDownSLine className="h-5 w-5 text-neutral-400" />
                </button>
                {isOpen && (
                  <div className="absolute top-[calc(100%+0.5rem)] z-10 w-full bg-white border border-neutral-300 rounded-[1rem] shadow-lg outline outline-[1px] outline-neutral-300">
                    {options.map((option) => (
                      <button
                        key={option.value}
                        className="block w-full px-4 py-2 text-left hover:bg-neutral-100 focus:outline-none"
                        onClick={() => handleSelect(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* ::::::::::::::::::::::: title */}
          <h2 className='text-[2rem] font-[600] capitalize'>{value} Investors</h2>

          <div 
            className='grid grid-cols-1 md:grid-cols-3 gap-[0.5rem] gap-y-[2rem] lg:gap-y-[4rem] lg:gap-[2rem] py-[2rem] '
          >
            {Array.from({length: 9}).map((_, i) => (
              <InvestorCard 
                key={i} 
                imageUrl='/images/hero1.jpg'
                name='Emmanuel Michael'
                company='Chocho Corporation'
                investmentAmount={400}
                description='This a lorem description for the investor card component.'
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Investors;