import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

function Signup() {
  const navigate = useNavigate();

  const { signupUser, isLoading, error } = useSignup();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await signupUser({name, email, password, passwordConfirm });
      navigate('/');
    } catch (err) {
      // Not defined yet;
    };
  };

  return (
    <main className='main'>
      <div className='login-form'>
        <h2 className='heading-secondary ma-bt-lg'>Create a new account</h2>
        <form className='form form--login' onSubmit={handleSubmit}>
          <div className='form__group'>
            <label className='form__label' htmlFor='name'>Your Name</label>
            <input id='name' className='form__input' placeholder='Your name' value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className='form__group ma-bt-md'>
            <label className='form__label' htmlFor='email'>Email Adrress</label>
            <input id='email' className='form__input' type='email' placeholder='you@example.com' value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className='form__group ma-bt-md'>
            <label className='form__label' htmlFor='password'>Password</label>
            <input id='password' className='form__input' type='password' placeholder='••••••••' value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className='form__group ma-bt-md'>
            <label className='form__label' htmlFor='password-confirm'>Confirm Password</label>
            <input className='form__input' id='password-confirm' type='password' placeholder='••••••••' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} required />
          </div>
          {
            error && (
              <div className='from__error'>
                {error}
              </div>
            )
          }
          <div className='form__group'>
            <button className='btn btn--green' type='submit' disabled={isLoading}>
              { isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup