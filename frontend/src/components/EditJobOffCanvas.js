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
import { states } from '../data/states';
import { getUser } from '../services/users';
import { editJob } from '../services/jobs';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import { formatLink } from '../utils/linkUtils';

const EditJobOffCanvas = ({ userJobData, jobToEdit, show, setShow }) => {
    const [company, setCompany] = useState('');
    const [companyClicked, setCompanyClicked] = useState(false);
    const [color, setColor] = useState('');
    const [jobStage, setJobStage] = useState('');
    const [companyLogo, setCompanyLogo] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleClicked, setJobTitleClicked] = useState(false);
    const [linkToJobPosting, setLinkToJobPosting] = useState('');
    const [city, setCity] = useState('');
    const [cityClicked, setCityClicked] = useState(false);
    const [jobState, setJobState] = useState('');
    const [contacts, setContacts] = useState([]);
    const [unlinkedContacts, setUnlinkedContacts] = useState([]);
    const [linkedContacts, setLinkedContacts] = useState([]);
    const [skills, setSkills] = useState([]);
    const [showSkillsAlert, setShowSkillsAlert] = useState(false); 
    const [showSkillSearch, setShowSkillSearch] = useState(false);
    const [updatingJob, setUpdatingJob] = useState(false);
    const { user, theme } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleClose = () => {
        setCompany(jobToEdit.company);
        setCompanyClicked(false);
        setColor(jobToEdit.color);
        setJobStage(jobToEdit.columnId);
        setCompanyLogo(null);
        setJobTitle(jobToEdit.jobTitle);
        setJobTitleClicked(false);
        setLinkToJobPosting(jobToEdit.link);
        setCity(jobToEdit.city);
        setCityClicked(false);
        setJobState(jobToEdit.state);
        setLinkedContacts(contacts.filter(contact => jobToEdit.contacts.includes(contact.id)));
        setUnlinkedContacts(contacts.filter(contact => !jobToEdit.contacts.includes(contact.id)));
        setSkills(jobToEdit.skills);
        setShowSkillsAlert(false);
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

    const submitHandler = async () => {
        if (company === '' || jobTitle === '' || city === '' || skills.length === 0) {
            company === '' && setCompanyClicked(true);
            jobTitle === '' && setJobTitleClicked(true); 
            city === '' && setCityClicked(true);
            skills.length === 0 && setShowSkillsAlert(true);
            return;
        }

        const newJobData = {
            color, 
            company,
            jobTitle,
            columnId: jobStage,
            city, 
            state: jobState, 
            skills, 
            link: linkToJobPosting === '' ? linkToJobPosting : 'https://' + formatLink(linkToJobPosting),   
            contacts: linkedContacts.map(contact => contact.id), 
            created: jobToEdit.created
        }

        if (companyLogo) {
            newJobData.companyLogo = companyLogo
        }

        setUpdatingJob(true);
        await editJob(user.auth, jobToEdit.id, newJobData, setError)

        const data = await getUser(user.auth, setError);
        dispatch({ type: 'SET_USER', payload: {data, auth: user.auth} });
        setUpdatingJob(false);
        handleClose();
    }

    const setError = (e) => {
        alert(e);
    }

    useEffect(() => {
        const loadContacts = async () => {
            const contacts = await getContacts(user.auth, setError);
            setContacts(contacts);
        }

        loadContacts();
    }, [show]);

    useEffect(() => {
        setCompany(jobToEdit.company);
        setColor(jobToEdit.color);
        setJobStage(jobToEdit.columnId);
        setCompanyLogo(null);
        setJobTitle(jobToEdit.jobTitle);
        setLinkToJobPosting(jobToEdit.link);
        setCity(jobToEdit.city);
        setJobState(jobToEdit.state);
        setLinkedContacts(contacts.filter(contact => jobToEdit.contacts.includes(contact.id)));
        setUnlinkedContacts(contacts.filter(contact => !jobToEdit.contacts.includes(contact.id)));
        setSkills(jobToEdit.skills);
    }, [jobToEdit]);


    return (
        <Offcanvas className={`${theme}`} show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit Job</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Offcanvas.Title className='border-bottom mb-3'>Job Info</Offcanvas.Title>
                <Row className='mb-2'>
                    <FormGroup as={Col} xs={9}>
                        <Form.Label>Company*</Form.Label>
                        <Form.Control
                            value={company}
                            onChange={e => setCompany(e.target.value)}
                            isValid={company !== ''}
                            isInvalid={companyClicked && company === ''}
                            onBlur={() => setCompanyClicked(true)}
                        />
                        <Form.Control.Feedback type='valid'/>
                        <Form.Control.Feedback type='invalid'>Please provide a company name</Form.Control.Feedback>
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
                        <Form.Label>Job Stage*</Form.Label>
                        <Form.Select onChange={e => {setJobStage(e.target.value)}}>
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
                        <Form.Label>Job Title*</Form.Label>
                        <Form.Control 
                            value={jobTitle}
                            onChange={e => setJobTitle(e.target.value)}
                            isValid={jobTitle !== ''}
                            isInvalid={jobTitleClicked && jobTitle === ''}
                            onBlur={() => setJobTitleClicked(true)}
                        />
                        <Form.Control.Feedback type='valid'/>
                        <Form.Control.Feedback type='invalid'>Please provide a job title</Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>Link to Job Posting</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>https://</InputGroup.Text>
                            <Form.Control value={formatLink(linkToJobPosting)} onChange={e => setLinkToJobPosting(e.target.value)}/>
                        </InputGroup>
                    </FormGroup>
                </Row>
                <Row className='mb-3'>
                    <FormGroup as={Col}>
                        <Form.Label>City*</Form.Label>
                        <Form.Control 
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            isValid={city !== ''}
                            isInvalid={cityClicked && city === ''}
                            onBlur={() => setCityClicked(true)}
                        />
                        <Form.Control.Feedback type='valid'/>
                        <Form.Control.Feedback type='invalid'>Please provide a city</Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>State*</Form.Label>
                        <Form.Select onChange={e => setJobState(e.target.value)}>(
                            {states.map((state, idx) => <option selected={jobState === state.name} key={idx}>{state.name}</option>)}
                        </Form.Select>
                    </FormGroup>
                </Row>
                <Offcanvas.Title className='border-bottom mb-2'>Job Skills</Offcanvas.Title>
                {showSkillsAlert && <p className='text-danger'><i className='fa-solid fa-triangle-exclamation me-1'/>At least one job skill is required</p>}
                <div className='d-flex flex-wrap'>
                    {
                        skills && skills.map((skill, idx) => (
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
                <ContactsTable contacts={unlinkedContacts} linkedContacts={linkedContacts} setContacts={setUnlinkedContacts} setLinkedContacts={setLinkedContacts}/>
                {unlinkedContacts && <ContactsDropdown contacts={unlinkedContacts} linkedContacts={linkedContacts} setContacts={setUnlinkedContacts} setLinkedContacts={setLinkedContacts}/>}
                <Row className='mt-3'>
                    <Col className='d-flex justify-content-end'>
                        <Button className='me-2' onClick={handleClose} variant='secondary'>Cancel</Button>
                        {
                            updatingJob
                                ? (
                                    <Button variant='primary' disabled>
                                        <Spinner
                                            as='span'
                                            animation='border'
                                            size='sm'
                                            role='status'
                                            className='me-1'
                                        />
                                        Updating Job
                                    </Button>
                                ) : (
                                    <Button onClick={submitHandler}>
                                        Update Job
                                    </Button>
                                )
                        }
                    </Col>
                </Row>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default EditJobOffCanvas;

