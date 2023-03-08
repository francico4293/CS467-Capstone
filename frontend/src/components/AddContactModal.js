import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createContact } from '../services/contacts';
import { getUser } from '../services/users';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/imageUtils';
import Spinner from 'react-bootstrap/Spinner';
import validator from 'validator';
import InputGroup from 'react-bootstrap/InputGroup';
import { PatternFormat } from 'react-number-format';

const AddContactModal = ({ show, setShow }) => {
    const { theme, user } = useSelector(state => state);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [firstNameClicked, setFirstNameClicked] = useState(false);
    const [lastName, setLastName] = useState('');
    const [lastNameClicked, setLastNameClicked] = useState(false);
    const [company, setCompany] = useState('');
    const [companyClicked, setCompanyClicked] = useState(false);
    const [contactPhoto, setContactPhoto] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleClicked, setJobTitleClicked] = useState(false);
    const [color, setColor] = useState('');
    const [email, setEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [linkedInProfile, setLinkedInProfile] = useState('');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [creatingContact, setCreatingContact] = useState(false);

    const setError = (e) => {
        alert(e)
    }

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (firstName === '' || lastName === '' || company === '' || jobTitle === '' || (email !== '' && !validator.isEmail(email))) {
            firstName === '' && setFirstNameClicked(true);
            lastName === '' && setLastNameClicked(true);
            company === '' && setCompanyClicked(true);
            jobTitle === '' && setJobTitleClicked(true);
            email !== '' && !validator.isEmail(email) && setInvalidEmail(true);
            return;
        }

        setCreatingContact(true);

        let photo = null;
        if (contactPhoto !== null) {
            const { file, url } = await getCroppedImg(contactPhoto, croppedAreaPixels);
            photo = file;
        }

        const newContact = {
            firstName, 
            lastName, 
            company, 
            contactPhoto, 
            jobTitle, 
            color, 
            email, 
            phoneNumber, 
            linkedInProfile: linkedInProfile !== '' ? 'https://' + linkedInProfile : linkedInProfile
        }
        await createContact(user.auth, newContact, photo, setError)

        const data = await getUser(user.auth, setError);
        dispatch({ type: 'SET_USER', payload: {data, auth: user.auth} });
        setCreatingContact(false);
        hideHandler();
    }

    const hideHandler = () => {
        setFirstName('');
        setFirstNameClicked(false);
        setLastName('');
        setLastNameClicked(false);
        setCompany('');
        setCompanyClicked(false);
        setJobTitle('');
        setJobTitleClicked(false);
        setColor('');
        setEmail('');
        setPhoneNumber('');
        setLinkedInProfile('');
        setContactPhoto(null);
        setInvalidEmail(false);
        setShow(false);
    }

    // BEGIN CODE CITATION
    // The following code is not my own
    // Author: TomDuffyTech
    // Source: https://www.youtube.com/watch?v=MqJzsDC1N0U
    // Decription: The below function removes a non-digit character from the provided phone number.
    // it then conditionally formats the phone number based on the length. For a phone number length
    // less than 4, the phone number is returned as is. For a phone number length less than 7, parens
    // are wrapped around the first three digits. For any other phone number length, parens are wrapped
    // around the first three digits and a hyphen is added after the next grouping of three digits.
    const formatPhoneNumber = (phoneNumber) => {
        phoneNumber = phoneNumber.replace(/[^\d]/g, '');

        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength < 4) {
            return phoneNumber;
        }

        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }

        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
    // END CODE CITATION

    return (
        <Modal id={`${theme}`} show={show} onHide={hideHandler} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='mb-2'>
                    <Form.Group as={Col} className='position-relative'>
                        <Form.Label>First name*</Form.Label>
                        <Form.Control 
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)} 
                            isValid={firstName !== ''} 
                            isInvalid={firstNameClicked && firstName === ''}
                            onBlur={() => setFirstNameClicked(true)}
                        />
                        <Form.Control.Feedback type='valid'/>
                        <Form.Control.Feedback type='invalid'>Please provide a first name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Last name*</Form.Label>
                        <Form.Control 
                            value={lastName} 
                            onChange={e => setLastName(e.target.value)} 
                            isValid={lastName !== ''} 
                            isInvalid={lastNameClicked && lastName === ''}
                            onBlur={() => setLastNameClicked(true)}
                        />
                        <Form.Control.Feedback type='valid'/>
                        <Form.Control.Feedback type='invalid'>Please provide a last name</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    {
                        contactPhoto
                            ? (
                                <>
                                    <div className='crop-container d-flex justify-content-center'>
                                        <Cropper
                                            image={contactPhoto}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={1}
                                            onCropChange={setCrop}
                                            onZoomChange={setZoom}
                                            onCropComplete={cropComplete}
                                        />
                                    </div>
                                    <div className='mt-3'>
                                        <label for="pictureZoom" className="form-label">Zoom</label>
                                        <input type="range" className="form-range" min={1} max={3} step={0.1} value={zoom} id="pictureZoom" 
                                            onChange={e => setZoom(e.target.value)}></input>
                                    </div>
                                </>
                            ) : <></>
                    }
                    <Form.Group as={Col}>
                        <Form.Label>Contact photo</Form.Label>
                        <Form.Control type='file' onChange={e => setContactPhoto(URL.createObjectURL(e.target.files[0]))}/>
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>Company*</Form.Label>
                        <Form.Control 
                            value={company} 
                            onChange={e => setCompany(e.target.value)} 
                            isValid={company !== ''} 
                            isInvalid={companyClicked && company === ''}
                            onBlur={() => setCompanyClicked(true)}
                        />
                        <Form.Control.Feedback type='valid'/>
                        <Form.Control.Feedback type='invalid'>Please provide a company</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
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
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type='email' 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            isInvalid={invalidEmail}
                            onClick={() => setInvalidEmail(false)}
                            isValid={validator.isEmail(email)}
                        />
                        <Form.Control.Feedback type='valid'/>
                        <Form.Control.Feedback type='invalid'>Invalid email</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control 
                            value={phoneNumber} 
                            onChange={e => setPhoneNumber(formatPhoneNumber(e.target.value))} 
                        />
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>LinkedIn profile</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>https://</InputGroup.Text>
                            <Form.Control value={linkedInProfile} onChange={e => setLinkedInProfile(e.target.value)}/>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} xs={4}>
                        <Form.Label>Contact color</Form.Label>
                        <Form.Control type='color' value={color} onChange={e => setColor(e.target.value)} />
                    </Form.Group>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={hideHandler}>
                    Close
                </Button>
                {
                    creatingContact
                        ? (
                            <Button variant='primary' disabled>
                                <Spinner
                                    as='span'
                                    animation='border'
                                    size='sm'
                                    role='status'
                                    className='me-1'
                                />
                                Creating Contact
                            </Button>
                        ) : (
                            <Button variant='primary' onClick={submitHandler}>
                                Save Changes
                            </Button>
                        )
                }
            </Modal.Footer>
        </Modal>
    );
}

export default AddContactModal;
