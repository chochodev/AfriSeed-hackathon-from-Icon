import Pages from './pages';
import './index.css';
import { CLIENT_ID } from '$/lib/constants';
import { ThirdwebProvider, ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { ThirdwebProvider as ThirdwebProviderV5 } from "thirdweb/react";
// import { ethers } from "ethers";

function App() {
  // const signer = new ethers.providers.Web3Provider(
  //   window.ethereum,
  // ).getSigner();

  return (
      <ThirdwebProvider
        activeChain={"ethereum"}
        clientId={CLIENT_ID}
      >
        <ThirdwebProviderV5>
            <Pages />
        </ThirdwebProviderV5>
      </ThirdwebProvider>
  )
}

export default App;