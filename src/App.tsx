import Pages from './pages';
import './index.css';
import { ThirdwebProvider } from "@thirdweb-dev/react";

function App() {
  return (
    <ThirdwebProvider activeChain="ethereum">
      <Pages />
    </ThirdwebProvider>
  )
}

export default App;