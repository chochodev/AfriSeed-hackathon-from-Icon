import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Investor from './investors';

const Pages = () => {
  return (
    <Router>
      <Routes>
        <Route path='/investors' element={<Investor />} />
      </Routes>
    </Router>
  )
}

export default Pages;