import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThirdwebProvider } from "@thirdweb-dev/react"
import { Base } from "@thirdweb-dev/chains"

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdwebProvider 
      clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}
      activeChain={Base}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThirdwebProvider>
  </StrictMode>,
)