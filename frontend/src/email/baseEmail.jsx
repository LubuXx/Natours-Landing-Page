import React, { useState } from 'react'

function baseEmail() {
    const [content, setContent] = useState('');

    return (
        <body>
            <table className='body' role='presentation' border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                    <tr>
                        <td></td>
                        <td className='container'>
                            <div className='content'>
                                {/*START CENTERED WHITE CONTAINER*/}
                                <table className='main' role='presentation'>
                                    {/*START MAIN AREA*/}
                                    <tbody>
                                        <tr>
                                            <td className='wrapper'>
                                                <table role='presetnation' border={0} cellPadding={0} cellSpacing={0}>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {/*CONTENT*/}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/*START FOOTER*/}
                                <div className='footer'>
                                    <table role='presentation' border={0} cellPadding={0} cellSpacing={0}>
                                        <tbody>
                                            <tr>
                                                <td className='content-block'>
                                                    <span className='apple-link'>Natours Inc, 123 Nowhere Road, San Fransisco CA 999999</span>
                                                    <br />
                                                    Don't like these emails?
                                                    <a href='#'>Unsubscribe</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
    );
};

export default baseEmail;