import React from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrorAlert = ({ message, show, setShow }) => {
    const handleClose = () => {
        setShow(false);
    }

    return (
        <Alert variant='danger' show={show} onClose={handleClose} dismissible>
            {message}
        </Alert>
    );
}

export default ErrorAlert;
