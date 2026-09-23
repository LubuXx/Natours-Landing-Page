import './App.css';
import Header from './components/Header';
import Overview from './components/Overview';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Tour from './pages/Tour';
import Account from './pages/Account';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import DownloadApps from './pages/DownloadApps';
import BecomeGuide from './pages/BecomeGuide';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Error from './pages/Error';

function App() {
  return (
    <div>
      <Header />
        <Routes>
          <Route path='/' element={<Overview />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/me' element={<Account />} />
          <Route path='/tours/:id' element={<Tour />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/download-apps' element={<DownloadApps />} />
          <Route path='/become-a-guide' element={<BecomeGuide />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<Error message={`404 Page Not Found!`} />} />
        </Routes>
      <Footer />
    </div>
  );
};

export default App