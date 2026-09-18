// TODO: This page is going to be include all alerts such as success message, error messages or notifications etc.
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';


function ShowAlert(status, message) {
    return(
        <Alert variant='filled' severity={`${status}`}>{message}</Alert>
    );
};

export default ShowAlert;