import React, { useRef } from 'react';

function ResetPassword() {
    const codeRefs = useRef([]);
    
    const handleCodeChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return;

        if (value && index < 5) {
            codeRefs.current[index + 1]?.focus();
        }
    };

    const handleCodeKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            codeRefs.current[index - 1]?.focus();
        }
    };

    return (
        <main className='main'>
            <div className='login-form'>
                <h2 className='heading-secondary ma-bt-lg'>Reset your password</h2>
                <form className='form form--login'>
                    <div className='form__group'>
                        <label className='' style={{display: 'flex', justifyContent: 'center', fontSize: '1.4rem', fontWeight: '600', marginBottom: '0.6rem'}}>Enter Your 6-Digit Reset Code</label>
                        <div className='reset-code'>
                            {[...Array(6)].map((_, index) => (
                                <input key={index} ref={(el) => {
                                        codeRefs.current[index] = el;
                                    }}
                                    className='reset-code__input'
                                    type='text'
                                    inputMode='numeric'
                                    maxLength='1'
                                    onChange={(e) =>
                                        handleCodeChange(e, index)
                                    }
                                    onKeyDown={(e) =>
                                        handleCodeKeyDown(e, index)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <div className='form__group reset-password__group'> 
                        <label className='form__label reset-password__label' htmlFor='password' >New Password </label> 
                        <input id='password' type='password' className='form__input reset-password__input' placeholder='Enter your new password' /> 
                    </div> 
                    <div className='form__group reset-password__group'> 
                        <label className='form__label reset-password__label' htmlFor='passwordConfirm' >Confirm New Password</label> 
                        <input id='passwordConfirm' className='form__input reset-password__input' type='password' placeholder='Confirm your new password' /> 
                    </div>
                    <div className='form__group ma-bt-md login-actions'>
                        <button className='btn btn--green' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ResetPassword;