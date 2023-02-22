import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import { getContacts } from '../services/contacts';

const AddJobOffCanvas = ({ show, setShow }) => {
    const [contacts, setContacts] = useState([]);
    const [linkedContacts, setLinkedContacts] = useState([]);
    const { user } = useSelector(state => state);

    const handleClose = () => {
        setLinkedContacts([]);
        setShow(false);
    }

    const setError = (e) => {
        alert(e)
    }

    const handleLinkContact = (contactToLink) => {
        const result = contacts.filter(contact => contact.id !== contactToLink.id);
        setLinkedContacts([...linkedContacts, contactToLink]);
        setContacts(result);
    }

    useEffect(() => {
        const loadContacts = async () => {
            const contacts = await getContacts(user.auth, setError);
            setContacts(contacts);
        }

        loadContacts();
    }, [show]);

    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Create a Job</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Offcanvas.Title className='border-bottom mb-3'>Job Info</Offcanvas.Title>
                <Row className='mb-2'>
                    <FormGroup as={Col}>
                        <Form.Label>Company</Form.Label>
                        <Form.Control/>
                    </FormGroup>
                </Row>
                <Row className='mb-2'>
                    <Form.Group xs={8} as={Col}>
                        <Form.Label>Company Logo</Form.Label>
                        <Form.Control type="file"/>
                    </Form.Group>
                    <FormGroup as={Col}>
                        <Form.Label>Job Color</Form.Label>
                        <Form.Control
                            type='color'
                            defaultValue="#563d7c"
                        />
                    </FormGroup>
                </Row>
                <Row className='mb-2'>
                    <FormGroup as={Col}>
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control/>
                    </FormGroup>
                </Row>
                <Row className='mb-2'>
                    <FormGroup as={Col}>
                        <Form.Label>Link to Job Posting</Form.Label>
                        <Form.Control/>
                    </FormGroup>
                </Row>
                <Row className='mb-3'>
                    <FormGroup as={Col}>
                        <Form.Label>City</Form.Label>
                        <Form.Control/>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>State</Form.Label>
                        <Form.Control/>
                    </FormGroup>
                </Row>
                <Offcanvas.Title className='border-bottom mb-3'>Job Skills</Offcanvas.Title>
                <Offcanvas.Title className='border-bottom mb-3'>Job Contacts</Offcanvas.Title>
                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th className='fw-normal text-center text-nowrap p-2'>First Name</th>
                            <th className='fw-normal text-center text-nowrap p-2'>Last Name</th>
                            <th className='fw-normal text-center text-nowrap p-2'>Company</th>
                            <th className='fw-normal text-center text-nowrap p-2'>Job Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linkedContacts.map((linkedContact, idx) => (
                            <tr key={idx}>
                                <td className='fw-light text-center align-middle'>{linkedContact.firstName}</td>
                                <td className='fw-light text-center align-middle'>{linkedContact.lastName}</td>
                                <td className='fw-light text-center align-middle'>{linkedContact.company}</td>
                                <td className='fw-light text-center align-middle'>{linkedContact.jobTitle}</td>
                            </tr>
                            
                        ))}
                    </tbody>
                </Table>
                <Dropdown>
                    <Dropdown.Toggle variant='secondary' size='sm'>
                        Link a Contact
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {contacts && contacts.map((contact, idx) => (
                            <Dropdown.Item key={idx} onClick={() => handleLinkContact(contact)}>{`${contact.firstName} ${contact.lastName}`}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Row className='mt-3'>
                    <Col className='d-flex justify-content-end'>
                        <Button className='me-2'>Create</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </Col>
                </Row>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default AddJobOffCanvas;
