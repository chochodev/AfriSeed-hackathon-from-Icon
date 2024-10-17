import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Countdown from '$/components/countDown';

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <AlertTriangle className="mx-auto mb-4 text-red-500" size={48} />
        <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-6 text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition duration-300"
        >
          Go to Home Page
        </button>
      </div>
      <Countdown seconds={10} onComplete={() => navigate('/')} />
    </div>
  )
}