import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Investor = lazy(() => import ('./investors'));
const Business = lazy(() => import ('./business'));
const Home = lazy(() => import ('./home'));

const Pages = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/investors' element={<Investor />} />
          <Route path='/business' element={<Business />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default Pages;