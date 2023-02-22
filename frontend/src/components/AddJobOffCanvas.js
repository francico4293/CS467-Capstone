import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getContacts } from '../services/contacts';
import ContactsTable from './ContactsTable';
import ContactsDropdown from './ContactsDropdown';

const AddJobOffCanvas = ({ show, setShow }) => {
    const [contacts, setContacts] = useState([]);
    const [linkedContacts, setLinkedContacts] = useState([]);
    const [skills, setSkills] = useState([]);
    const [showSkillSearch, setShowSkillSearch] = useState(false);
    const { user, theme } = useSelector(state => state);

    const handleClose = () => {
        setLinkedContacts([]);
        setShow(false);
    }

    const addSkill = (e) => {
        if (e.keyCode === 13) {
            setSkills([...skills, e.target.value]);
            setShowSkillSearch(false);
        }
    }

    const setError = (e) => {
        alert(e)
    }

    useEffect(() => {
        const loadContacts = async () => {
            const contacts = await getContacts(user.auth, setError);
            setContacts(contacts);
        }

        loadContacts();
    }, [show]);

    return (
        <Offcanvas className={`${theme}`} show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Create a Job</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Offcanvas.Title className='border-bottom mb-3'>Job Info</Offcanvas.Title>
                <Row className='mb-2'>
                    <FormGroup as={Col} xs={9}>
                        <Form.Label>Company</Form.Label>
                        <Form.Control/>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>Job Color</Form.Label>
                        <Form.Control
                            type='color'
                            defaultValue="#563d7c"
                        />
                    </FormGroup>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>Company Logo (.svg)</Form.Label>
                        <Form.Control type="file"/>
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <FormGroup as={Col}>
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control/>
                    </FormGroup>
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
                <Offcanvas.Title className='border-bottom mb-2'>Job Skills</Offcanvas.Title>
                <div className='d-flex flex-wrap'>
                    {
                        skills.map((skill, idx) => (
                            <div className='skill-badge d-flex justify-content-center align-items-center text-nowrap mt-2 me-2' key={idx}>
                                {skill}<i className='fa-solid fa-xmark ms-2'/>
                            </div>
                        ))
                    }
                    {/* <div className='skill-badge d-flex justify-content-center align-items-center mt-2 me-2'>
                        React.js<i className='fa-solid fa-xmark ms-2'/>
                    </div>
                    <div className='skill-badge d-flex justify-content-center align-items-center text-nowrap mt-2 me-2'>
                        A really, really, really long skill<i className='fa-solid fa-xmark ms-2'/>
                    </div>
                    <div className='skill-badge d-flex justify-content-center align-items-center mt-2 me-2'>
                        Python<i className='fa-solid fa-xmark ms-2'/>
                    </div>
                    <div className='skill-badge d-flex justify-content-center align-items-center mt-2 me-2'>
                        Java<i className='fa-solid fa-xmark ms-2'/>
                    </div>
                    <div className='skill-badge d-flex justify-content-center align-items-center text-nowrap mt-2 me-2'>
                        Google Cloud Platform<i className='fa-solid fa-xmark ms-2'/>
                    </div>
                    <div className='skill-badge d-flex justify-content-center align-items-center text-nowrap mt-2 me-2'>
                        JavaScript<i className='fa-solid fa-xmark ms-2'/>
                    </div>
                    <div className='skill-badge d-flex justify-content-center align-items-center text-nowrap mt-2 me-2'>
                        TypeScript<i className='fa-solid fa-xmark ms-2'/>
                    </div>
                    <div className='skill-badge d-flex justify-content-center align-items-center text-nowrap mt-2 me-2'>
                        Docker<i className='fa-solid fa-xmark ms-2'/>
                    </div>
                    <div className='skill-badge d-flex justify-content-center align-items-center text-nowrap mt-2 me-2'>
                        x86<i className='fa-solid fa-xmark ms-2'/>
                    </div> */}
                </div>
                {
                    showSkillSearch
                        ? (
                            <Row className='mb-3'>
                                <FormGroup className='mt-2' onBlur={() => setShowSkillSearch(false)} onKeyDown={e => addSkill(e)}>
                                    <Form.Control size='sm' autoFocus='true'/>
                                </FormGroup>
                            </Row>
                        ) : (
                            <div className='d-flex mb-3'>
                                <div className='add-skill bg-primary-outline d-flex justify-content-center align-items-center mt-2 me-2' onClick={() => setShowSkillSearch(true)}>
                                    <i className='fa-solid fa-plus me-1'/>Add Skill
                                </div>
                            </div>
                        )
                }
                <Offcanvas.Title className='border-bottom mb-3'>Job Contacts</Offcanvas.Title>
                <ContactsTable contacts={contacts} linkedContacts={linkedContacts} setContacts={setContacts} setLinkedContacts={setLinkedContacts}/>
                {contacts && <ContactsDropdown contacts={contacts} linkedContacts={linkedContacts} setContacts={setContacts} setLinkedContacts={setLinkedContacts}/>}
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
