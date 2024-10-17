import { Navigate, Outlet } from "react-router-dom";
import { useAddress } from '@thirdweb-dev/react';


const ProtectedRoute = () => {
  const address = useAddress();
  return address ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;