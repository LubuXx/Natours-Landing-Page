import React from 'react';
import Alert from '@mui/material/Alert';


function ShowAlert(status, message) {
    return(
        <Alert style={{fontSize: '15px'}} variant='filled' severity={`${status}`}>{message}</Alert>
    );
};

export default ShowAlert;