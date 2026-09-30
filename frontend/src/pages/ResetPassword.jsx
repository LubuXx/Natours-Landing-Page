import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/authService';
import ShowAlert from '../components/Alert';
import CircularIndeterminate from '../components/Loading';

function ResetPassword() {
    const codeRefs = useRef([]);

    const navigate = useNavigate();

    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleCodeChange = (e, index) => {
        const value = e.target.value;
        if (!/^[A-Za-z0-9]?$/.test(value)) return;

        const code = codeRefs.current.map(input => input?.value || '').join('');
        setToken(code);
        if (value && index < 5) {
            codeRefs.current[index + 1]?.focus();
        };
    };

    const handleCodeKeyDown = (e, index) => { 
        if (e.key === 'Backspace' && !e.target.value && index > 0) { 
            codeRefs.current[index - 1]?.focus(); 
        } 
    };

    const handleResetPassword = async e => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            await resetPassword(token, password, passwordConfirm);
            setSuccess(true);
            window.setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again later!');
            setSuccess(false);
        }finally {
            setLoading(false);
        };
    }

    return (
        <main className='main'>
            {
                loading && (
                    <div className='loading-overlay'>
                        {CircularIndeterminate()}
                    </div>
                )
            }
            <div className='login-form'>
                <h2 className='heading-secondary ma-bt-lg'>Reset your password</h2>
                <form className='form form--login' onSubmit={handleResetPassword}>
                    <div className='form__group'>
                        <label style={{display: 'flex', justifyContent: 'center', fontSize: '1.4rem', fontWeight: '600', marginBottom: '0.6rem'}}>Enter Your 6-Digit Reset Code</label>
                        <div className='reset-code'>
                            {[...Array(6)].map((_, index) => (
                                <input key={index} className='reset-code__input' type='text' maxLength='1' onChange={e => handleCodeChange(e, index)} onKeyDown={e => handleCodeKeyDown(e, index)} ref={el => {
                                    codeRefs.current[index] = el;
                                }}/>
                            ))}
                        </div>
                    </div>
                    <div className='form__group reset-password__group'> 
                        <label className='form__label reset-password__label' htmlFor='password' >New Password </label> 
                        <input id='password' type='password' className='form__input reset-password__input' value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter your new password' /> 
                    </div> 
                    <div className='form__group reset-password__group'> 
                        <label className='form__label reset-password__label' htmlFor='passwordConfirm' >Confirm New Password</label> 
                        <input id='passwordConfirm' className='form__input reset-password__input' type='password' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder='Confirm your new password' /> 
                    </div>
                    <div className='form__group ma-bt-md login-actions'>
                        <button className='btn btn--green' type='submit' disabled={loading}>
                            {
                                loading ? 'resetting...' : 'Submit'
                            }
                        </button>
                    </div>
                    {
                        error && (
                            ShowAlert('error', error)
                        )
                    }
                    {
                        success && (
                            ShowAlert('success', 'Password successfully updated!')
                        )
                    }
                </form>
            </div>
        </main>
    );
}

export default ResetPassword;