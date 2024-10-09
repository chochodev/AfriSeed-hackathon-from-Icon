import { FaDollarSign, FaBuilding } from 'react-icons/fa'

interface InvestorCardProps {
  name: string
  company: string
  investmentAmount: number
  description: string
  imageUrl: string
}

const InvestorCard = ({
  name,
  company,
  investmentAmount,
  description,
  imageUrl
}: InvestorCardProps) => {
  return (
    <div className="group bg-white shadow-[0_2px_5px_-1px_rgba(0,0,0,0.2)] rounded-[16px] overflow-hidden max-w-sm">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={`${name} from ${company}`}
          className="object-cover ease-250 group-hover:scale-105"
        />
      </div>
      <div className="p-6 group-hover:bg-neutral-50 ease-250">
        <h2 className="text-2xl font-bold mb-2 text-neutral-800">{name}</h2>
        <div className="flex items-center mb-4">
          <FaBuilding className="text-neutral-500 mr-2" />
          <span className="text-neutral-600">{company}</span>
        </div>
        <div className="flex items-center mb-4">
          <FaDollarSign className="text-green-500 mr-2" />
          <span className="text-neutral-700 font-semibold">
            ${investmentAmount.toLocaleString()}
          </span>
        </div>
        <p className="text-neutral-600 mb-4">{description}</p>
        <button className="bg-primary-600 hover:bg-primary-800 text-white font-bold py-2 px-4 rounded-[2rem] ease-250 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50">
          Contact Investor
        </button>
      </div>
    </div>
  )
}

export default InvestorCard;