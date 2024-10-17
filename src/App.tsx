import Pages from './pages';
import './index.css';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { CLIENT_ID } from './lib/constants';

function App() {
  return (
    <ThirdwebProvider 
      clientId={CLIENT_ID}
      activeChain="ethereum"
    >
      <Pages />
    </ThirdwebProvider>
  )
}

export default App;