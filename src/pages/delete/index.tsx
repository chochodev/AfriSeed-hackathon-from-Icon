import { useState, useEffect } from 'react'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import Loader from '$/components/loader'

interface Business {
  id: number
  name: string
  short_description: string
}

export default function DeleteBusinessPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const backend_url = import.meta.env.VITE_APP_BACKEND_URL

  useEffect(() => {
    fetchBusinesses()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get(`${backend_url}/businesses/`)
      setBusinesses(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch businesses');
      console.log('Error: ', err);
      setLoading(false)
    }
  }

  const deleteBusiness = async (id: number) => {
    try {
      await axios.delete(`${backend_url}/businesses/${id}`)
      setBusinesses(businesses.filter(business => business.id !== id))
    } catch (err) {
      setError('Failed to delete business');
      console.log('Error: ', err);
    }
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Businesses</h1>
      <ul className="space-y-4">
        {businesses.map(business => (
          <li 
            key={business.id} 
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
          >
            <div>
              <h2 className="text-lg font-semibold">{business.name}</h2>
              <p className="text-gray-600">{business.short_description}</p>
            </div>
            <button
              onClick={() => deleteBusiness(business.id)}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              aria-label={`Delete ${business.name}`}
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
      {businesses.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No businesses found.</p>
      )}
    </div>
  )
}