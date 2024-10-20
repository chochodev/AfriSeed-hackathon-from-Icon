import { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckCircle, DollarSign, Users, Calendar, ArrowUpRight } from 'lucide-react'
import MainLayout from '$/layout'

interface Business {
  id: number
  name: string
  short_description: string
  total_amount: number
  investors: number
  deadline: Date
  is_completed: boolean
}

export default function ProfilePage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const backend_url = import.meta.env.VITE_APP_BACKEND_URL

  useEffect(() => {
    fetchUserBusinesses()
  }, []);

  const fetchUserBusinesses = async () => {
    try {
      const response = await axios.get(`${backend_url}/user/businesses`, {
        withCredentials: true 
      })
      setBusinesses(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch businesses');
      setLoading(false);
      console.log(err);
    }
  }

  const handleWithdrawal = async (businessId: number) => {
    if (window.confirm('Are you sure you want to withdraw funds and mark this project as complete?')) {
      try {
        await axios.post(`${backend_url}/businesses/${businessId}/withdraw`, {}, {
          withCredentials: true
        })
        setBusinesses(businesses.map(business => 
          business.id === businessId ? { ...business, is_completed: true } : business
        ))
      } catch (err) {
        setError('Failed to process withdrawal');
        console.log(err);
      }
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

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

  return (
    <MainLayout>
      <div className="w-full max-w-[72rem] mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Your Businesses</h1>
        {businesses.length === 0 ? (
          <p className="text-center text-gray-500">You haven't created any businesses yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map(business => {
              const actualDaysLeft = calculateDaysLeft(business.deadline);
              let daysLeft;
              if (actualDaysLeft < 1){
                daysLeft = 0;
              } else {
                daysLeft = actualDaysLeft;
              }
                          
              return(
                <div key={business.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{business.name}</h2>
                    <p className="text-gray-600 mb-4">{business.short_description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <DollarSign className="text-green-500 mr-2" size={20} />
                        <span className="text-sm">${business.total_amount.toLocaleString()} raised</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="text-blue-500 mr-2" size={20} />
                        <span className="text-sm">{business.investors} investors</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="text-purple-500 mr-2" size={20} />
                        <span className="text-sm">{daysLeft} days left</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className={`mr-2 ${business.is_completed ? 'text-green-500' : 'text-gray-400'}`} size={20} />
                        <span className="text-sm">{business.is_completed ? 'Completed' : 'Ongoing'}</span>
                      </div>
                    </div>
                    {!business.is_completed && (
                      <button
                        onClick={() => handleWithdrawal(business.id)}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                      >
                        Withdraw Funds <ArrowUpRight className="ml-2" size={16} />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </MainLayout>
  )
}