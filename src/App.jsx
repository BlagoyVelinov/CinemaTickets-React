import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './css/style.css'

import Header from "./components/Header"
import Footer from './components/Footer'
import HomeTab from './components/Home'
import ProgramTab from './components/Program'
import FourDxTab from './components/4dx'
import ImaxTab from './components/Imax'
import OffersTab from './components/Offers'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'


const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <Router {...router}>
      <div className="tail-top">
        <div className="tail-bottom">
          <div id="main">
            <Header />
            <Routes>
              <Route path="/" element={<HomeTab />} />
              <Route path="/program" element={<ProgramTab />} />
              <Route path="/4dx" element={<FourDxTab />} />
              <Route path="/imax" element={<ImaxTab />} />
              <Route path="/offers" element={<OffersTab />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
