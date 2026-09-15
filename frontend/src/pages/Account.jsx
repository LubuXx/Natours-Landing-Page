// TODO: Update Account interface depending on roles (guide and lead-guide)

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function NavItem({ link, text, icon, active = false }) {
    return (
        <li className={active ? 'side-nav--active' : ''}>
            <Link to={link}>
                <svg>
                    <use href={`/img/icons.svg#icon-${icon}`} />
                </svg>
                {text}
            </Link>
        </li>
    );
};

export default function Account() {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <main className='main'>
            <div className='user-view'>
                <nav className='user-view__menu'>
                    <ul className='side-nav'>
                        <NavItem link="#" text='Settings' icon='settings' active />
                        <NavItem link='/my-tours' text='My bookings' icon='briefcase' />
                        <NavItem link='#' text='My reviews' icon='star' />
                        <NavItem link='#' text='Billing' icon='credit-card' />
                    </ul>
                    {
                        user.role === 'admin' && (
                            <div className='admin-nav'>
                                <h5 className='admin-nav__heading'>Admin</h5>
                                <ul className='side-nav'>
                                    <NavItem link='#' text='Manage Tours' icon='map' />
                                    <NavItem link='#' text='Manage Users' icon='users' />
                                    <NavItem link='#' text='Manage Reviews' icon='star' />
                                    <NavItem link='#' text='Manage Bookings' icon='briefcase' />
                                </ul>
                            </div>
                        )
                    }
                </nav>
                <div className='user-view__content'>
                    <div className='user-view__form-container'>
                        <h2 className='heading-secondary ma-bt-md'>Your account settings</h2>
                        <form className='form form-user-data'>
                            <div className='form__group'>
                                <label className='form__label' htmlFor='name'>Name</label>
                                <input id='name' className='form__input' type='text' value={user.name} required name='name' />
                            </div>
                            <div className='form__group ma-bt-md'>
                                <label className='form__label' htmlFor='email'>Email</label>
                                <input id='email' className='form__input' type='email' value={user.email} required name='email' />
                            </div>
                            <div className='form__group form__photo-upload'>
                                <img className='form__user-photo' src={`/img/users/${user.photo}`} alt={`${user.name}'s photo`} />
                                <input className='form__upload' type='file' accept='image/*' id='photo' name='photo'  />
                                <label className='form__label' htmlFor='photo'>Choose new photo</label>
                            </div>
                            <div className='form__group right'>
                                <button className='btn btn--small btn--green' type='submit'>Save settings</button>
                            </div>
                        </form>
                    </div>
                    <div className='line'>
                        &nbsp;
                    </div>
                    <div className='user-view__form-container'>
                        <h2 className='heading-secondary ma-bt-md'>Password change</h2>
                        <form className='form form-user-password'>
                            <div className='form__group'>
                                <label className='form__label' htmlFor='password-current'>Current password</label>
                                <input id='password-current' className='form__input' type='password' placeholder='••••••••' minLength={8} required />
                            </div>
                            <div className='form__group'>
                                <label className='form__label' htmlFor='password'>New password</label>
                                <input id='password' className='form__input' type='password' placeholder='••••••••' minLength={8} required />
                            </div>
                            <div className='form__group ma-bt-lg'>
                                <label className='form__label' htmlFor='password-confirm'>Confirm password</label>
                                <input id='password-confirm' className='form__input' type='password' placeholder='••••••••' minLength={8} required />
                            </div>
                            <div className='form__group right'>
                                <button type='submit' className='btn btn--small btn--green btn--save-password'>Save password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};