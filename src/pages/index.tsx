import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import ('./home'));
const Investor = lazy(() => import ('./investors'));
const Business = lazy(() => import ('./business'));
const BusinessForm = lazy(() => import ('./businessForm'));
const BusinessPage = lazy(() => import ('./viewBusiness'));

const Pages = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/investors' element={<Investor />} />
          <Route path='/business' element={<Business />} />
          <Route path='/business/add' element={<BusinessForm />} />
          <Route path='/business/*' element={<BusinessPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default Pages;