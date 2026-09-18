// TODO: This page will be error page such as 404 not found or something went wrong etc:
import React from 'react'

function Error({ message }) {
    return (
        <main className='main'>
            <div className='error'>
                <div className='error__title'>
                    <h2 className='heading-secondary heading-secondary--error'>{message}</h2>
                </div>
            </div>
        </main>
    )
}

export default Error