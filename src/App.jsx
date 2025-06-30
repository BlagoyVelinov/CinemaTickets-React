import { useState } from 'react';
import { Routes, Route } from 'react-router';

import { MovieProvider } from './contexts/MovieContext';
import { UserContext } from './contexts/UserContext';

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

     const [authData, setAuthData] = useState(() => {
        const stored = localStorage.getItem('authData');
        return stored ? JSON.parse(stored) : {};
    });

    const userLoginHandler = (resultData) => {        
        setAuthData(resultData);
        localStorage.setItem('authData', JSON.stringify(resultData));
    };

    const userLogoutHandler = () => {        
        setAuthData({});
        localStorage.removeItem('authData');
    };

  return (
    <UserContext.Provider value={{...authData, userLoginHandler, userLogoutHandler}}>
        <div className="tail-top">
            <div className="tail-bottom">
                <div id="main">
                    <MovieProvider>
                        <Header />
                            <Routes>
                                <Route index element={<HomeTab />} />
                                <Route path="/program" element={<ProgramTab />} />
                                <Route path="/4dx" element={<FourDxTab />} />
                                <Route path="/imax" element={<ImaxTab />} />
                                <Route path="/offers" element={<OffersTab />} />
                                <Route path="/about-us" element={<AboutUs />} />
                                <Route path="/contact-us" element={<ContactUs />} />
                                <Route path="/users/login" element={<Login />} />
                                <Route path="/users/register" element={<SignUp />} />
                            </Routes>
                    </MovieProvider>
                    <Footer />
                </div>
            </div>
        </div>
    </UserContext.Provider>
  )
}

export default App
