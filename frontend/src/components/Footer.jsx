import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer'>
            <div className='footer__logo'>
                <img src='../../public/img/logo-green.png' alt='Natours logo' />
            </div>
            <ul className='footer__nav'>
                <li>
                    <Link to='/about-us'>About us</Link>
                </li>
                <li>
                    <Link to='/download-apps'>Download apps</Link>
                </li>
                <li>
                    <Link to='/become-a-guide'>Become a guide</Link>
                </li>
                <li>
                    <Link to='/careers'>Careers</Link>
                </li>
                <li>
                    <Link to='/contact'>Contact</Link>
                </li>
            </ul>
            <p className='footer__copyright'>© {new Date().getFullYear()} LubuX. All rights reserved.</p>
        </div>
    );
};

export default Footer