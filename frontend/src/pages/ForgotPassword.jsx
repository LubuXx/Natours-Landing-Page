import React from 'react';
import CircularIndeterminate from '../components/Loading';
import ShowAlert from '../components/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/authService';

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSendToken = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await forgotPassword(email);
      setSuccess(true);
      window.setTimeout(() => {
        navigate('/resetPassword');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sent token!');
      setSuccess(false);
    } finally {
      setLoading(false);
    };
  };

  return (
    <main className='main'>
      {loading && (
        <div className='loading-overlay'>
          {CircularIndeterminate()}
        </div>
      )}
      <div className='login-form'>
        <h2 className='heading-secondary ma-bt-lg'>Forgot your password?</h2>
        <form className='form form--login' onSubmit={handleSendToken}>
          <div className='form__group'>
            <label className='form__label' htmlFor='email'>Enter Your Email Adrress</label>
            <input className='form__input' id='email' type='email' placeholder='you@example.com' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='form__group ma-bt-md login-actions'>
            <button className='btn btn--green' type='submit' disabled={loading}>
              {loading ? 'Sending token...' : 'Send Reset Token'}
            </button>
          </div>
          {
            error && (
              ShowAlert('error', error)
            )
          }
          {
            success && (
              ShowAlert('success', 'Token sent to the email!')
            )
          }
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;