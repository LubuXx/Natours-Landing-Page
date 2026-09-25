import React from 'react'
import AboutUs from '../pages/AboutUs'
import DownloadApps from '../pages/DownloadApps';
import BecomeGuide from '../pages/BecomeGuide';
import Careers from '../pages/Careers';
import Contact from '../pages/Contact';
import Error from '../pages/Error';
import Overview from '../components/Overview';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Tour from '../pages/Tour';
import Account from '../pages/Account';
import ForgotPassword from '../pages/ForgotPassword';
import { Routes, Route } from 'react-router-dom';

function RouterSchemas() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Overview />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/forgotPassword' element={<ForgotPassword />} />
                <Route path='/me' element={<Account />} />
                <Route path='/tours/:id' element={<Tour />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/download-apps' element={<DownloadApps />} />
                <Route path='/become-a-guide' element={<BecomeGuide />} />
                <Route path='/careers' element={<Careers />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='*' element={<Error message={`404 Page Not Found!`} />} />
            </Routes>
        </div>
    );
}

export default RouterSchemas