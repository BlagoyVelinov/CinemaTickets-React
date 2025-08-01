import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router';

import { UserProvider } from './providers/UserProvider';
import { MovieProvider } from './contexts/MovieContext';
import { OrderModalProvider } from './contexts/OrderModalContext';

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
import GuestGuard from './components/guards/GuestGuard';
import CreateOrder from './components/order/CreateOrder';
import AuthGuard from './components/guards/AuthGuard';
import AdminGuard from './components/guards/AdminGuard';
import AccountSettings from './components/user-account/AccountSettings';
const Admin = lazy(() => import('./components/admin/Admin'));


function App() {
    const location = useLocation();
    const isOrderModal = location.pathname === '/program/order';
    const isAdminSection = location.pathname.startsWith('/admin-section');

  return (
    <UserProvider>
            <div className="tail-top">
                <div className="tail-bottom">
                    <div id="main">
                        <MovieProvider>
                            <OrderModalProvider>
                                <Header />
                                    <Routes>
                                        <Route index element={<HomeTab />} />
                                        <Route path="/program" element={<ProgramTab />} />
                                        <Route element={<AuthGuard />} >
                                            <Route path="/program/order?" element={null} />
                                            <Route path="/account/settings" element={<AccountSettings />} />
                                        </Route>
                                        <Route path="/4dx" element={<FourDxTab />} />
                                        <Route path="/imax" element={<ImaxTab />} />
                                        <Route path="/offers" element={<OffersTab />} />
                                        <Route path="/about-us" element={<AboutUs />} />
                                        <Route path="/contact-us" element={<ContactUs />} />
                                        <Route element={<GuestGuard />}>
                                            <Route path="/users/login" element={<Login />} />
                                            <Route path="/users/register" element={<SignUp />} />
                                        </Route>
                                        <Route element={<AdminGuard />}>
                                            <Route path="/admin-section/*" element={(
                                                <Suspense fallback={<p>Loading...</p>}>
                                                    <Admin />
                                                </Suspense>
                                            )} />
                                        </Route>
                                    </Routes>
                            </OrderModalProvider>
                        </MovieProvider>
                        {!isOrderModal && !isAdminSection && <Footer />}
                    </div>
                </div>
            </div>
    </UserProvider>
  )
}

export default App
