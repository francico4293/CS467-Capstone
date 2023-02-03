import React from 'react';
import Alert from 'react-bootstrap/Alert';

const SuccessAlert = ({ message, show, setShow }) => {
    const handleClose = () => {
        setShow(false);
    }

    return (
        <Alert variant='success' show={show} onClose={handleClose} dismissible>
            {message}
        </Alert>
    );
}

export default SuccessAlert;
