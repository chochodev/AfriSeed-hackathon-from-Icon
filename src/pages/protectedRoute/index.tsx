import { Outlet } from "react-router-dom";
import { useActiveWalletConnectionStatus, useActiveWallet } from 'thirdweb/react';
import ConnectWalletPage from '../error/connect-wallet';


const ProtectedRoute = () => {
  const activeWallet = useActiveWallet();
  console.log('connected wallet address: ', activeWallet?.getAccount()?.address)
  const connectionStatus = useActiveWalletConnectionStatus();
  return connectionStatus === 'connected' ? <Outlet /> : <ConnectWalletPage />;
};

export default ProtectedRoute;