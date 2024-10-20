import { Outlet } from "react-router-dom";
import { useActiveWalletConnectionStatus } from 'thirdweb/react';
import ConnectWalletPage from '../error/connect-wallet';


const ProtectedRoute = () => {
  const connectionStatus = useActiveWalletConnectionStatus();
  return connectionStatus === 'connected' ? <Outlet /> : <ConnectWalletPage />;
};

export default ProtectedRoute;