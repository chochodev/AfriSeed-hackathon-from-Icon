import Pages from './pages';
import './index.css';
import { ThirdwebProvider } from "thirdweb/react";

function App() {
  return (
      <ThirdwebProvider>
        <Pages />
      </ThirdwebProvider>
  )
}

export default App;