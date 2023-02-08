import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { editUser } from '../actions/userActions';

const EditBio = ({ handleClose }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state);
    const [firstName, setFirstName] = useState(user.data.firstName);
    const [lastName, setLastName] = useState(user.data.lastName);
    const [description, setDescription] = useState(user.data.description);

    const setError = () => {
        alert("Profile update failed!");
    }

    const handleBioUpdate = async () => {
        dispatch(editUser(user.auth, { firstName, lastName, description }), setError);
        handleClose();
    }

    return (
        <>
            <Row className='mt-2 mb-2'>
                <Form.Group as={Col}>
                    <Form.Label>First name</Form.Label>
                    <Form.Control value={firstName} onChange={e => setFirstName(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control value={lastName} onChange={e => setLastName(e.target.value)}/>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col}>
                    <Form.Label>Bio</Form.Label>
                    <Form.Control as='textarea' rows={3} value={description} onChange={e => setDescription(e.target.value)}/>
                </Form.Group>
            </Row>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleBioUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </>
    );
}

export default EditBio;
