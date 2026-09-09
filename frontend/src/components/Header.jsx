import React, { useState } from 'react';

function Header() {
    const [user, setUser] = useState(null);

    return (
        <div className='header'>
            <nav className='nav--tours'>
                <a className='nav__el' href='/'>All Tours</a>
            </nav>
            <div className='header__logo'>
                <img src='../../public/img/logo-white.png'alt='Natours logo' />
            </div>
            <nav className='nav nav--user'>
                {
                    user != null ?
                    <div>
                        <a className='nav__el nav__el--logout'>Log out</a>
                        <a className='nav__el' href="/me">
                            <img className='nav__user-img' src={user.photo} alt={`Photo of ${user.name}`} />
                            <span>{user.name.split(' ')[0]}</span>
                        </a>
                    </div>
                    :
                    <div>
                        <a className='nav__el' href='/login'>Log in</a>
                        <a className='nav__el nav__el--cta' href='/signup'>Sign up</a>
                    </div>
                }
            </nav>
        </div>
    );
};

export default Header