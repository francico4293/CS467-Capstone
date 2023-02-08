import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { updateUserPassword } from '../services/users';

const UpdatePassword = ({ setPasswordUpdateSuccess, handleClose }) => {
    const { user } = useSelector(state => state);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordUpdateFailure, setPasswordUpdateFailure] = useState(false);

    const handlePasswordUpdate = async () => {
        try {
            await updateUserPassword(user, currentPassword, newPassword);
            setPasswordUpdateSuccess(true);
            handleClose();
        } catch (err) {
            setPasswordUpdateFailure(true);
        }
    }

    return (
        <>
            <Row className='mt-2 mb-2'>
                <Form.Group className='mb-2'>
                    <Form.Label>Current Password</Form.Label>
                    <InputGroup>
                        <Form.Control type={showCurrentPassword ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
                        <InputGroup.Text onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                            {showCurrentPassword ? <i className='fa-solid fa-eye-slash'/> : <i className='fa-solid fa-eye'/>}
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Form.Group className='mb-2'>
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                        <Form.Control type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                        <InputGroup.Text onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <i className='fa-solid fa-eye-slash'/> : <i className='fa-solid fa-eye'/>}
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Form.Group className='mb-2'>
                    <Form.Label>Confirm New Password</Form.Label>
                    <InputGroup>
                        <Form.Control type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                        <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <i className='fa-solid fa-eye-slash'/> : <i className='fa-solid fa-eye'/>}
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handlePasswordUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </>
    );
}

export default UpdatePassword;
