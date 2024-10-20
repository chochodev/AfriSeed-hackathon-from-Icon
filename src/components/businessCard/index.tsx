import { Link } from 'react-router-dom';

interface Business {
  id: string
  logo: string
  cover_image: string

  name: string
  short_description: string
  location: string
  category: string
  minimum_investment: number
  deadline: Date

  total_amount: number
  investors: number

  // ::::::::::::::: pitch
  pitch_summary: string
  pitch_problem: string
  pitch_solution: string
  pitch_market_opportunity: string
  pitch_traction: string
}

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  // Calculate days left until the deadline
  const calculateDaysLeft = (deadline: Date) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    
    // Reset time to avoid issues with hours, minutes, and seconds
    today.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const timeDifference = deadlineDate.getTime() - today.getTime();

    // Convert milliseconds to days
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  };

  const actualDaysLeft = calculateDaysLeft(business.deadline);
  let daysLeft;
  if (actualDaysLeft < 1){
    daysLeft = 0;
  } else {
    daysLeft = actualDaysLeft;
  }

  return (
    <Link 
      to={`/business/${business.id}`}
      className='group relative flex flex-col h-[22.5rem] lg:h-[31.25rem] w-full rounded-[16px] overflow-hidden shadow-[0_2px_5px_-2px_rgba(0,0,0,0.25)] '
    >
      <img 
        src={`${business.cover_image}`}
        alt="company" 
        className='w-full h-[13rem] lg:h-[15.625rem] rounded-t-[16px] object-cover '
      />

      {/* :::::::::::::::::::::: text content */}
      <div 
        className='absolute bottom-0 left-0 z-1 flex flex-1 flex-col h-max w-full space-y-[1rem] bg-white ease-400 delay-100 '
      >
        {/* :::::::::::::::::::::: logo */}
        <div
          className='relative left-[1.5rem] top-[-1.875rem] mb-[-2rem] z-[2] size-[3rem] lg:size-[3.5rem] bg-white p-[5px] rounded-[4px] shadow-[0_1px_5px_-1px_rgba(0,0,0,0.25)] '
        >
          <img
            src={`${business.logo}`}
            alt='logo'
            className='size-full object-cover rounded-[4px]'
          />
        </div>

        <div className='px-[1.5rem] w-full '>
          <h2 className='font-[700] text-[1.25rem] lg:text-[1.5rem]'>{business.name}</h2>
          <p className='min-h-[3rem] text-neutral-500 text-[0.75rem] sm:max-md:text-[0.875rem] lg:text-[0.875rem] '>{business.pitch_summary.slice(0,70)}...</p>
        </div>

        {/* :::::::::::::::::::: hidden content on hover */}
        <div 
          className='max-lg:hidden w-full space-y-[0.5rem] px-[1.5rem] translate-y-0 group-hover:translate-y-[15rem] h-[4rem] group-hover:h-0 ease-400 '
        >
          <p className='text-neutral-400 text-[1rem]'>{business.location}</p>
          <div className='space-x-[0.5rem]'>
            <p className='text-neutral-600 bg-neutral-200 text-[0.625rem] w-max rounded-[2px] py-[2px] px-[0.375rem] '>{business.category}</p>
          </div>
          <small className='text-neutral-400 text-[0.625rem] '>Verified by AfriSeed plc.</small>
        </div>

        {/* :::::::::::::::::::: on hover content */}
        <div 
          className='h-0 opacity-0 overflow-hidden text-[0.875rem] lg:text-[1rem] pb-[1.5rem] group-hover:h-[5rem] lg:group-hover:h-[10.5rem] group-hover:opacity-100 ease-400 '
        >
          <p className='max-lg:flex pb-2 px-[1.5rem] '>
            <b className='max-lg:flex-1'>${business.total_amount}</b> total expected
          </p>
          <p className='max-lg:flex border-solid border-0 lg:border-t-[1px] border-neutral-300 py-2 px-[1.5rem] '>
            <b className='max-lg:flex-1'>{business.investors}</b> investors
          </p>
          <p className='max-lg:hidden border-solid border-0 border-t-[1px] border-neutral-300 py-2 px-[1.5rem] '>
            <b>{daysLeft}</b> days left
          </p>
          <p className='max-lg:hidden border-solid border-0 border-t-[1px] border-neutral-300 py-2 px-[1.5rem] '>
            <b>${business.minimum_investment}</b> minimum investment
          </p>
        </div>
      </div>
    </Link>
  )
}

export default BusinessCard