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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={`${name} from ${company}`}
          className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{name}</h2>
        <div className="flex items-center mb-4">
          <FaBuilding className="text-gray-500 mr-2" />
          <span className="text-gray-600">{company}</span>
        </div>
        <div className="flex items-center mb-4">
          <FaDollarSign className="text-green-500 mr-2" />
          <span className="text-gray-700 font-semibold">
            ${investmentAmount.toLocaleString()}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Contact Investor
        </button>
      </div>
    </div>
  )
}

export default InvestorCard;