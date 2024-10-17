import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet2 } from 'lucide-react';
import Countdown from '$/components/countDown';

export default function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState(false)
  const navigate = useNavigate()

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulating wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsConnecting(false)
    // After successful connection, you would typically set some state or context
    // For now, we'll just redirect to the profile page
    navigate('/profile')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <Wallet2 className="mx-auto mb-4 text-primary-600" size={48} />
        <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="mb-6 text-gray-600">
          Connect your wallet to access your profile and manage your businesses.
        </p>
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition duration-300 disabled:opacity-50"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
      <Countdown seconds={30} onComplete={() => navigate('/')} />
    </div>
  )
}