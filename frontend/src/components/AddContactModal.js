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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [linkedInProfile, setLinkedInProfile] = useState('');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const setError = (e) => {
        alert(e)
    }

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        let photo = null;
        if (contactPhoto !== null) {
            const { file, url } = await getCroppedImg(contactPhoto, croppedAreaPixels);
            photo = file;
        }

        const newContact = {firstName, lastName, company, contactPhoto, jobTitle, color, email, phoneNumber, linkedInProfile}
        await createContact(user.auth, newContact, photo, setError)

        const data = await getUser(user.auth, setError);
        dispatch({ type: 'SET_USER', payload: {data, auth: user.auth} });
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
        setShow(false);
    }

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
