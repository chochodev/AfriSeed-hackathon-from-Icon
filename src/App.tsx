import Pages from './pages';
import './index.css';
import { CLIENT_ID } from '$/lib/constants';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Base } from "@thirdweb-dev/chains"
// import { ethers } from "ethers";

function App() {
  // const signer = new ethers.providers.Web3Provider(
  //   window.ethereum,
  // ).getSigner();

  return (
      <ThirdwebProvider
        activeChain={Base}
        clientId={CLIENT_ID}
      >
            <Pages />
      </ThirdwebProvider>
  )
}

export default App;