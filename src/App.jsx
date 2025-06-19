import { Routes, Route } from 'react-router';
import HomeTab from './components/home/Home';
import ProgramTab from './components/program/Program';
import FourDxTab from './components/four-dx/4dx';
import ImaxTab from './components/imax/Imax';
import OffersTab from './components/offers/Offers';
import AboutUs from './components/about/AboutUs';
import ContactUs from './components/contact/ContactUs';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import SignUp from './components/sign-up/SignUp';



function App() {
  return (
   
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
                        <Route path="/users/login" element={<Login />} />
                        <Route path="/users/register" element={<SignUp />} />
                    </Routes>
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default App
