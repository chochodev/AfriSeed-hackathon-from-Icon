import { useEffect, useState } from 'react';
import BusinessCard from '$/components/businessCard';
import MainLayout from '$/layout';
import { RiSearch2Line, RiArrowDownSLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from '$/components/ui/skeleton';


interface Business {
  id: string
  logo: string
  cover_image: string

  name: string
  short_description: string
  location: string
  category: string
  minimum_investment: number
  days_left: number

  amount_raised: number
  investors: number

  // ::::::::::::::: pitch
  pitch_summary: string
  pitch_problem: string
  pitch_solution: string
  pitch_market_opportunity: string
  pitch_traction: string
}
// interface Item {
//   name: string
//   verified: boolean
// }

const options = [
  { value: "all", label: "All" },
  { value: "verified", label: "Verified" },
]

const Business = () => {
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

  
  // ::::::::::::::::::::: fetching all businesses
  const [businesses, setBusinesses] = useState<Business[]>([]); 

  const backend_url = import.meta.env.VITE_APP_BACKEND_URL;
  
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(`${backend_url}/businesses/`);
        setBusinesses(response.data);
        console.log('businesses: ', response.data);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchBusinesses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <div className='flex size-full flex-col space-y-[4rem] items-center justify-center py-[3rem] md:py-[6rem] px-[1rem] lg:px-[2rem] bg-neutral-100 '>
        <div className='w-full max-w-[72rem]'>     
          <h2 className='text-[2rem] lg:text-[2.5rem] font-[800] '>Investment opportunities</h2>
          <p className='text-[1rem] text-neutral-500'>Browse current investment opportunities on Republic.<br/>
          All companies are vetted & pass due diligence.</p>

          <nav className='flex flex-wrap items-center space-y-[1rem] space-x-[2rem] w-full py-[2rem] '>
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

            {/* :::::::::::::::::::::::: add business button */}
            <Link
              to='/business/add'
              className='bg-neutral-800 text-neutral-100 font-[600] text-[0.875rem] px-[2rem] py-[0.375rem] rounded-[1rem] outline outline-1 outline-neutral-200 hover:bg-neutral-100 hover:text-neutral-800 active:bg-neutral-200 shadow-[0_0_20px_-1px_rgba(0,0,0,0.1)] ease-250 '
            >
              Add <span className='text-[1rem]'>+</span>
            </Link>
          </nav>

          {/* ::::::::::::::::::::::: title */}
          <h2 className='text-[2rem] font-[600] capitalize'>{value} Businesses</h2>

          <div 
            className='grid grid-cols-1 md:grid-cols-3 gap-[0.5rem] gap-y-[2rem] lg:gap-y-[4rem] lg:gap-[2rem] py-[2rem] '
          >
          {(businesses.length > 0 )?
            <>
            {businesses?.map((business, i) => (
              <BusinessCard business={business} key={i} />
            ))}
            </> :
            (<>
              {[1,2,3].map((_, i) => (
                <div
                  key={i}
                  className='group relative flex flex-col space-y-[1rem] h-[22.5rem] lg:h-[31.25rem] w-full rounded-[16px] overflow-hidden shadow-[0_2px_5px_-2px_rgba(0,0,0,0.25)] '
                >
                  <Skeleton className='w-full h-[13rem] lg:h-[15.625rem] rounded-t-[16px]' />
                  <Skeleton className='w-full h-[3rem] lg:h-[1.625rem]' />
                  <Skeleton className='w-full h-[1rem] lg:h-[1.625rem]' />
                  <Skeleton className='w-full h-[1rem] lg:h-[1.625rem]' />
                </div>
              ))}
            </>)
          }
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Business;