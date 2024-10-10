import { useState } from 'react';
import { FaRegClock, FaCheckCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Business {
  id: string
  name: string
  logo: string
  coverImage: string
  shortDescription: string
  fullDescription: string
  pitch: {
    summary: string
    problem: string
    solution: string
    marketOpportunity: string
    competitive: string
    businessModel: string
    traction: string
  }
  location: string
  category: string
  amountRaised: number
  investors: number
  valuation: string
  minimumInvestment: number
  daysLeft: number
}

const business: Business = {
  id: '1',
  name: 'TechInnovate',
  logo: '/images/hero4.jpg',
  coverImage: '/images/hero5.jpg',
  shortDescription: 'AI-powered solutions for businesses',
  fullDescription: 'TechInnovate is revolutionizing the way businesses interact with data, providing scalable and efficient AI and machine learning solutions for companies of all sizes.',
  pitch: {
    summary: 'TechInnovate is revolutionizing the way businesses interact with data, providing scalable and efficient AI and machine learning solutions for companies of all sizes.',
    problem: 'Many businesses struggle to effectively utilize their data due to lack of expertise and resources in AI and machine learning.',
    solution: 'Our AI-powered platform democratizes access to advanced data analytics, making it easy for businesses of all sizes to gain valuable insights and automate decision-making processes.',
    marketOpportunity: 'The global AI market is projected to grow from $387.45 billion in 2022 to $1,394.30 billion in 2029, at a CAGR of 20.1%.',
    competitive: "Unlike our competitors who offer one-size-fits-all solutions, TechInnovate provides customizable AI models that adapt to each business's unique needs and data structures.",
    businessModel: "We operate on a SaaS model with tiered pricing based on data volume and complexity of AI models. We also offer consulting services for enterprise clients.",
    traction: "In our first year, we've onboarded 50+ clients across various industries, achieving a 95% retention rate and $2M in ARR."
  },
  location: 'Nairobi, Kenya',
  category: 'Technology',
  amountRaised: 100000,
  investors: 122,
  valuation: '$5M',
  minimumInvestment: 100,
  daysLeft: 15,
}

const BusinessPage = () => {
  // const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={business.logo}
              alt={`${business.name} logo`}
              className="size-[2.5rem] object-cover rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold">{business.name}</h1>
              <p className="text-sm text-neutral-500">{business.shortDescription}</p>
            </div>
          </div>
          <button className="bg-primary-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-700 transition duration-300">
            Invest Now
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
              <img
                src={business.coverImage}
                alt={`${business.name} cover`}
                className='object-cover'
              />
              <button 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white"
                onClick={() => {}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* :::::::::::::::::::::::: description */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Pitch</h2>
              <p className="text-neutral-600 mb-4">{business.pitch.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-sm">
                  {business.category}
                </span>
                <span className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full text-sm">
                  {business.location}
                </span>
              </div>
              {['problem', 'solution', 'marketOpportunity', 'competitive', 'businessModel', 'traction'].map((section) => (
                <div key={section} className="mb-4">
                  <button 
                    onClick={() => toggleSection(section)}
                    className="w-full text-left text-primary-600 font-semibold flex items-center justify-between"
                  >
                    <span>{section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                    {expandedSections.includes(section) ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedSections.includes(section) && (
                    <p className="text-neutral-600 mt-2">{business.pitch[section as keyof typeof business.pitch]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Funding Progress</h3>
                <div className="flex items-center text-primary-600">
                  <FaRegClock className="mr-1" />
                  <span>{business.daysLeft} days left</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="h-2 bg-neutral-200 rounded-full">
                  <div className="h-2 bg-primary-600 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <p className="text-3xl font-bold mb-2">${business.amountRaised.toLocaleString()}</p>
              <p className="text-neutral-600 mb-6">raised of $250,000 goal</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-neutral-600 text-sm">Investors</p>
                  <p className="font-bold text-lg">{business.investors}</p>
                </div>
                <div>
                  <p className="text-neutral-600 text-sm">Valuation</p>
                  <p className="font-bold text-lg">{business.valuation}</p>
                </div>
              </div>
              <button className="w-full bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 transition duration-300 mb-4">
                Invest Now
              </button>
              <p className="text-center text-neutral-600 text-sm">
                ${business.minimumInvestment} minimum investment
              </p>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center text-green-600 mb-4">
                <FaCheckCircle className="mr-2" />
                <span className="font-semibold">Verified by AfriSeed plc</span>
              </div>
              <p className="text-neutral-600 text-sm">
                This offering has been verified by AfriSeed plc. Investors should review all offering materials and conduct their own due diligence.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BusinessPage;