import React from 'react';
import Alert from '@mui/material/Alert';


function ShowAlert(status, message) {
    return(
        <Alert variant='filled' severity={`${status}`}>{message}</Alert>
    );
};

export default ShowAlert;