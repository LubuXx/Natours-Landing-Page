import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

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
                        <a className='nav__el nav__el--logout' onClick={logout}>Log out</a>
                        <Link className='nav__el' to="/me">
                            <img className='nav__user-img' src={user.photo} alt={`Photo of ${user.name}`} />
                            <span>{user.name[0]}</span>
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