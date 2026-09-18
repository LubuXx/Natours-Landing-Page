import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import ShowAlert from '../components/Alert';
import { circularProgressClasses } from '@mui/material/CircularProgress';

function Login() {
  const navigate = useNavigate();

  const { loginUser, isLoading, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setSuccess(false);
      await loginUser({ email, password });
      setSuccess(true);
      window.setTimeout(() => {
        navigate('/me');
      }, 1500);
    } catch (err) {
      setSuccess(false);
    } finally {
    };
  };

  return (
    <main className='main'>
      {isLoading && <circularProgressClasses />}
      <div className='login-form'>
        <h2 className='heading-secondary ma-bt-lg'>Log in to your accound</h2>
        <form className='form form--login' onSubmit={handleSubmit}>
          <div className='form__group'>
            <label className='form__label' htmlFor='email'>Email Adrress</label>
            <input id='email' className='form__input' type='email' placeholder='you@example.com' value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className='form__group ma-bt-md'>
            <label className='form__label' htmlFor='password'>Password</label>
            <input id='password' className='form__input' type='password' placeholder='••••••••' value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div className='form__group ma-bt-md'>
            <button className='btn btn--green' type='submit' disabled={isLoading}>
              { isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          {
            error && (
              ShowAlert('error', error)
            )
          }
          {
            success && (
              ShowAlert('success', 'Logged in successfully!')
            )
          }
        </form>
      </div>
    </main>
  );
};

export default Login