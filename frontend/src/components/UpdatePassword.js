import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { updateUserPassword } from '../services/users';
import Spinner from 'react-bootstrap/Spinner';

const UpdatePassword = ({ setPasswordUpdateSuccess, handleClose }) => {
    const { user } = useSelector(state => state);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordUpdateFailure, setPasswordUpdateFailure] = useState(false);
    const [updatingPassword, setUpdatingPassword] = useState(false);

    const handlePasswordUpdate = async () => {
        try {
            if (currentPassword === newPassword || newPassword !== confirmPassword) {
                throw new Error();
            }

            setUpdatingPassword(true);
            await updateUserPassword(user, currentPassword, newPassword);
            setPasswordUpdateSuccess(true);
            setUpdatingPassword(false);
            handleClose();
        } catch (err) {
            setUpdatingPassword(false);
            setPasswordUpdateFailure(true);
        }
    }

    return (
        <>
            <Row className='mt-3 mb-2'>
                <Form.Group as={Col}>
                    <Form.Label>Current Password*</Form.Label>
                    <InputGroup>
                        <InputGroup.Text onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                            {showCurrentPassword ? <i className='fa-solid fa-eye-slash'/> : <i className='fa-solid fa-eye'/>}
                        </InputGroup.Text>
                        <Form.Control 
                            type={showCurrentPassword ? 'text' : 'password'} 
                            value={currentPassword} 
                            onChange={e => setCurrentPassword(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className='mb-2'>
                <Form.Group as={Col}>
                    <Form.Label>New Password*</Form.Label>
                    <InputGroup>
                        <InputGroup.Text onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <i className='fa-solid fa-eye-slash'/> : <i className='fa-solid fa-eye'/>}
                        </InputGroup.Text>
                        <Form.Control 
                            type={showNewPassword ? 'text' : 'password'} 
                            value={newPassword} 
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col}>
                    <Form.Label>Confirm New Password*</Form.Label>
                    <InputGroup>
                        <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <i className='fa-solid fa-eye-slash'/> : <i className='fa-solid fa-eye'/>}
                        </InputGroup.Text>
                        <Form.Control 
                            type={showConfirmPassword ? 'text' : 'password'} 
                            value={confirmPassword} 
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
            </Row>
            {
                passwordUpdateFailure
                    ? (
                        <Row className='mt-2 mb-2'>
                            <Col className='text-danger'>
                                Password update failed:
                                <ul>
                                    <li>Verify current password is correct</li>
                                    <li>Verify new password is different than current password</li>
                                    <li>Verify new password and confirm new password are the same</li>
                                </ul>
                            </Col>
                        </Row>
                    ) : <></>
            }
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {
                    updatingPassword
                        ? (
                            <Button>
                                <Spinner
                                    as='span'
                                    animation='border'
                                    size='sm'
                                    role='status'
                                    className='me-1'
                                />
                                Updating
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handlePasswordUpdate}>
                                Update
                            </Button>
                        )
                }
            </Modal.Footer>
        </>
    );
}

export default UpdatePassword;
