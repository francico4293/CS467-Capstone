import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createContact } from '../services/contacts';
import { getUser } from '../services/users';

const AddContactModal = ({ show, setShow }) => {
    const { theme, user } = useSelector(state => state);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [color, setColor] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [linkedInProfile, setLinkedInProfile] = useState('');

    const setError = (e) => {
        alert(e)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const newContact = {firstName, lastName, company, jobTitle, color, email, phoneNumber, linkedInProfile}
        await createContact(user.auth, newContact, setError)

        const data = await getUser(user.auth, setError);
        dispatch({ type: 'SET_USER', payload: {data, auth: user.auth} });
        hideHandler();
    }

    const hideHandler = () => {
        setFirstName('');
        setLastName('');
        setCompany('');
        setJobTitle('');
        setColor('');
        setEmail('');
        setPhoneNumber('');
        setLinkedInProfile('');
        setShow(false);
    }

    return (
        <Modal id={`${theme}`} show={show} onHide={hideHandler} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>First name</Form.Label>
                        <Form.Control value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control value={lastName} onChange={e => setLastName(e.target.value)} required/>
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>Company</Form.Label>
                        <Form.Control value={company} onChange={e => setCompany(e.target.value)} required/>
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>Company Logo (.svg)</Form.Label>
                        <Form.Control type='file' />
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control value={jobTitle} onChange={e => setJobTitle(e.target.value)} required/>
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>LinkedIn profile</Form.Label>
                        <Form.Control value={linkedInProfile} onChange={e => setLinkedInProfile(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} xs={4}>
                        <Form.Label>Contact color</Form.Label>
                        <Form.Control type='color' value={color} onChange={e => setColor(e.target.value)} />
                    </Form.Group>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideHandler}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitHandler}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddContactModal;
