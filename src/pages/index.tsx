import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import ('./home'));
const Investor = lazy(() => import ('./investors'));
const Business = lazy(() => import ('./business'));
const BusinessForm = lazy(() => import ('./business/add'));
const BusinessPage = lazy(() => import ('./business/view'));
const DeleteBusiness = lazy(() => import ('./business/delete'));
const ProfilePage = lazy(() => import ('./profile'));
const ProtectedRoute = lazy(() => import('./protectedRoute'));

import Loader from '$/components/loader';

const Pages = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/investors' element={<Investor />} />
          <Route path='/business' element={<Business />} />

          <Route path='/business/:id' element={<BusinessPage />} />
          <Route path='/business/delete' element={<DeleteBusiness />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/business/add' element={<BusinessForm />} />
          </Route>

          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default Pages;