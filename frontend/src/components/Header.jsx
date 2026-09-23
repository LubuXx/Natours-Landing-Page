import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Header() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <div className='header'>
            <nav className='nav--tours'>
                <Link className='nav__el' to='/'>All Tours</Link>
            </nav>
            <div className='header__logo'>
                <img src='../../public/img/logo-white.png'alt='Natours logo' />
            </div>
            <nav className='nav nav--user'>
                {
                    isAuthenticated ? (
                    <div>
                        <Link to='/' className='nav__el nav__el--logout' onClick={logout}>Log out</Link>
                        <Link className='nav__el' to="/me">
                            <img className='nav__user-img' src={`${BACKEND_URL}/img/users/${user.photo}`} alt={`Photo of ${user.name}`} />
                            <span>{user.name.split(' ')[0]}</span>
                        </Link>
                    </div>
                    ) : (
                    <div>
                        <Link className='nav__el' to='/login'>Log in</Link>
                        <Link className='nav__el nav__el--cta' to='/signup'>Sign up</Link>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Header