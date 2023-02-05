import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { sendUserPasswordResetEmail } from '../services/users';

const PasswordResetModal = ({ show, setShow }) => {
    const theme = useSelector(state => state.theme);
    const [email, setEmail] = useState('');

    const handleReset = async () => {
        try {
            console.log(email);
            await sendUserPasswordResetEmail(email);
            setEmail('');
            setShow(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        setEmail('');
        setShow(false);
    }

    return (
        <Modal id={`${theme}`} className='reset-password-modal' show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Forgot Password?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col'>
                        Enter your email and we'll send you a password reset link
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" onChange={({ target }) =>
                                setEmail(target.value)}/>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleReset}>
                Reset Password
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PasswordResetModal;
