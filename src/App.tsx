import Pages from './pages';
import './index.css';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { CLIENT_ID } from './lib/constants';
import { QueryClient, QueryClientProvider } from 'react-query';

// ::::::::::::::::: Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider 
        clientId={CLIENT_ID}
        activeChain="ethereum"
      >
        <Pages />
      </ThirdwebProvider>
    </QueryClientProvider>
  )
}

export default App;