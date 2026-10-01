import React, { useState } from 'react';
import baseEmail from './baseEmail';

function passwordResetEmail() {
    const [firstName, setFirsName] = useState('');
    const [url, setUrl] = useState('');

    return (
        <div>
            <baseEmail />
                <p>Hi {firstName},</p>
                <p>Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: {url}.</p>
                <table className='btn btn-primary' role='presentation' border={0} cellPadding={0} cellSpacing={0}>
                    <tbody>
                        <tr>
                            <td align='left'>
                                <table role='presentation' border={0} cellPadding={0} cellSpacing={0}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <a href={`${url}`} target='_blank'>Reset Your password</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>If you did't forget your password, please ignore this email!</p>
        </div>
    );
};

export default passwordResetEmail;