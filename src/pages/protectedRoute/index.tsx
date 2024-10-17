import { Outlet } from "react-router-dom";
import { useAddress } from '@thirdweb-dev/react';
import ConnectWalletPage from '../error/connect-wallet';


const ProtectedRoute = () => {
  const address = useAddress();
  return address ? <Outlet /> : <ConnectWalletPage />;
};

export default ProtectedRoute;