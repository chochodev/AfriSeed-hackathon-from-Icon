import { Navigate, Outlet } from "react-router-dom";
import { useAddress } from '@thirdweb-dev/react';


const ProtectedRoute = () => {
  const address = useAddress();
  return address ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;

// then app.js should look this way

// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import other components that you need...

// <BrowserRouter>
//       <Routes>
//         <Route path="*" element={<NotFoundPage />} />
//         <Route path="/" element={<LoginPage />} />
//         <Route element={<ProtectedRoutes />}>
//           <Route path="/user-list" element={<UserListPage />} />
//           <Route path="/add-user" element={<AddUserPage />} />
//           <Route path="/user-details/:id" element={<UserDetailsPage />} />
//           <Route path="/update-user/:id" element={<UpdateUserPage />} />
//         </Route>
//       </Routes>
// </BrowserRouter>