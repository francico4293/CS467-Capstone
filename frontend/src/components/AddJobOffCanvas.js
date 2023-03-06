import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getContacts } from '../services/contacts';
import ContactsTable from './ContactsTable';
import ContactsDropdown from './ContactsDropdown';
import { getUser } from '../services/users';
import { createJob } from '../services/jobs';
import { states } from '../data/states';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';

const AddJobOffCanvas = ({ userJobData, selectedJobColumn, show, setShow }) => {
    const [company, setCompany] = useState('');
    const [color, setColor] = useState('');
    const [jobStage, setJobStage] = useState('');
    const [companyLogo, setCompanyLogo] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    const [linkToJobPosting, setLinkToJobPosting] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [contacts, setContacts] = useState([]);
    const [linkedContacts, setLinkedContacts] = useState([]);
    const [skills, setSkills] = useState([]);
    const [showSkillSearch, setShowSkillSearch] = useState(false);
    const [creatingJob, setCreatingJob] = useState(false);
    const { user, theme } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleClose = () => {
        setCompany('');
        setColor('');
        setJobStage('');
        setCompanyLogo(null);
        setJobTitle('');
        setLinkToJobPosting('');
        setCity('');
        setState('');
        setContacts([]);
        setLinkedContacts([]);
        setSkills([]);
        setShowSkillSearch(false);
        setShow(false);
    }

    const addSkill = (e) => {
        if (e.keyCode === 13) {
            setSkills([...skills, e.target.value]);
            setShowSkillSearch(false);
        }
    }

    const removeSkill = (skillToRemove) => {
        const result = skills.filter(skill => skill !== skillToRemove);
        setSkills(result);
    }

    const addJob = async () => {
        const newJob = {
            color, 
            company,
            companyLogo,
            jobTitle, 
            city, 
            state, 
            skills, 
            link: linkToJobPosting !== '' ? 'https://' +  linkToJobPosting : linkToJobPosting,  
            contacts: linkedContacts.map(contact => contact.id), 
            created: new Date() 
        }

        setCreatingJob(true);
        await createJob(user.auth, newJob, jobStage, setError)

        const data = await getUser(user.auth, setError);
        dispatch({ type: 'SET_USER', payload: {data, auth: user.auth} });
        setCreatingJob(false);
        handleClose();
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
        setJobStage(selectedJobColumn);
        setColor('#563d7c');
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
                        <Form.Control onChange={e => setCompany(e.target.value)}/>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>Job Color</Form.Label>
                        <Form.Control
                            type='color'
                            defaultValue={color}
                            onChange={e => setColor(e.target.value)}
                        />
                    </FormGroup>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>Job Stage</Form.Label>
                        <Form.Select onChange={e => setJobStage(e.target.value)}>
                            {userJobData.columns.map((column, idx) => <option key={idx} value={column.id} selected={column.id === jobStage}>{column.name.charAt(0).toUpperCase() + column.name.slice(1)}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Company Logo (.svg)</Form.Label>
                        <Form.Control type="file" onChange={e => setCompanyLogo((e.target.files[0]))}/>
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <FormGroup as={Col}>
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control onChange={e => setJobTitle(e.target.value)}/>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>Link to Job Posting</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>https://</InputGroup.Text>
                            <Form.Control onChange={e => setLinkToJobPosting(e.target.value)}/>
                        </InputGroup>
                    </FormGroup>
                </Row>
                <Row className='mb-3'>
                    <FormGroup as={Col}>
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={e => setCity(e.target.value)}/>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>State</Form.Label>
                        <Form.Select onChange={e => setState(e.target.value)}>(
                            {states.map((state, idx) => <option key={idx}>{state.name}</option>)}
                        </Form.Select>
                    </FormGroup>
                </Row>
                <Offcanvas.Title className='border-bottom mb-2'>Job Skills</Offcanvas.Title>
                <div className='d-flex flex-wrap'>
                    {
                        skills.map((skill, idx) => (
                            <div className='skill-badge d-flex justify-content-center align-items-center text-nowrap mt-2 me-2' key={idx}>
                                {skill}<i className='fa-solid fa-xmark ms-2' onClick={() => removeSkill(skill)}/>
                            </div>
                        ))
                    }
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
                        <Button className='me-2' variant='secondary' onClick={handleClose}>Cancel</Button>
                        {
                            creatingJob
                                ? (
                                    <Button variant='primary' disabled>
                                        <Spinner
                                            as='span'
                                            animation='border'
                                            size='sm'
                                            role='status'
                                            className='me-1'
                                        />
                                        Creating Job
                                    </Button>
                                ) : (
                                    <Button onClick={addJob}>
                                        Create Job
                                    </Button>
                                )
                        }
                    </Col>
                </Row>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default AddJobOffCanvas;
