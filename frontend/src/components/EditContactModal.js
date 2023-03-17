import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/imageUtils';
import validator from 'validator';
import Spinner from 'react-bootstrap/Spinner';
import { editContact } from '../services/contacts';
import { getUser } from '../services/users';
import InputGroup from 'react-bootstrap/InputGroup';
import { formatPhoneNumber, isPhoneNumberValid } from '../utils/phoneNumberUtils';

const EditContactModal = ({ show, contact, setContactToEdit }) => {
    const { theme, user } = useSelector(state => state);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(contact.firstName || '');
    const [firstNameClicked, setFirstNameClicked] = useState(false);
    const [lastName, setLastName] = useState(contact.lastName || '');
    const [lastNameClicked, setLastNameClicked] = useState(false);
    const [company, setCompany] = useState(contact.company || '');
    const [companyClicked, setCompanyClicked] = useState(false);
    const [newContactPhoto, setNewContactPhoto] = useState(null);
    const [jobTitle, setJobTitle] = useState(contact.jobTitle || '');
    const [jobTitleClicked, setJobTitleClicked] = useState(false);
    const [color, setColor] = useState(contact.color || '');
    const [email, setEmail] = useState(contact.email || '');
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber || '');
    const [phoneNumberClicked, setPhoneNumberClicked] = useState(false);
    const [linkedInProfile, setLinkedInProfile] = useState(contact.linkedInProfile || '');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [editingContact, setEditingContact] = useState(false);

    const setError = (e) => {
        alert(e)
    }

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (firstName === '' || lastName === '' || company === '' || jobTitle === '' || (email !== '' && !validator.isEmail(email)) || (phoneNumber !== '' && !isPhoneNumberValid(phoneNumber))) {
            email !== '' && !validator.isEmail(email) && setIsInvalidEmail(true);
            firstName === '' && setFirstNameClicked(true);
            lastName === '' && setLastNameClicked(true);
            company === '' && setCompanyClicked(true);
            jobTitle === '' && setJobTitleClicked(true);
            return;
        }

        setEditingContact(true);

        let photo = null;
        if (newContactPhoto !== null) {
            const { file, url } = await getCroppedImg(newContactPhoto, croppedAreaPixels);
            photo = file;
        }

        const newContactInfo = {
            firstName,
            lastName,
            company,
            contactPhoto: newContactPhoto || contact.contactPhoto,
            jobTitle,
            color,
            email,
            phoneNumber,
            linkedInProfile: linkedInProfile.slice(0, 8) !== 'https://' ? 'https://' + linkedInProfile : linkedInProfile,
        }
        await editContact(user.auth, contact.id, newContactInfo, photo, setError)

        const data = await getUser(user.auth, setError);
        dispatch({ type: 'SET_USER', payload: { data, auth: user.auth } });
        setEditingContact(false);
        hideHandler();
    }

    const hideHandler = () => {
        setFirstNameClicked(false);
        setLastNameClicked(false);
        setCompanyClicked(false);
        setJobTitleClicked(false);
        setIsInvalidEmail(false);
        setPhoneNumberClicked(false);
        setContactToEdit(null);
    }

    return (
        <Modal id={`${theme}`} show={show} onHide={hideHandler} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>First name*</Form.Label>
                        <Form.Control
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            isValid={firstName !== ''}
                            isInvalid={firstNameClicked && firstName === ''}
                            onBlur={() => setFirstNameClicked(true)}
                        />
                        <Form.Control.Feedback type='valid' />
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
                        <Form.Control.Feedback type='valid' />
                        <Form.Control.Feedback type='invalid'>Please provide a last name</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    {
                        newContactPhoto
                            ? (
                                <>
                                    <div className='crop-container d-flex justify-content-center'>
                                        <Cropper
                                            image={newContactPhoto}
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
                        <Form.Control type='file' onChange={e => setNewContactPhoto(URL.createObjectURL(e.target.files[0]))} />
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
                        <Form.Control.Feedback type='valid' />
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
                        <Form.Control.Feedback type='valid' />
                        <Form.Control.Feedback type='invalid'>Please provide a job title</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            value={email}
                            isInvalid={isInvalidEmail}
                            onChange={e => setEmail(e.target.value)}
                            isValid={validator.isEmail(email)}
                            onClick={() => setIsInvalidEmail(false)}
                        />
                        <Form.Control.Feedback type='valid' />
                        <Form.Control.Feedback type='invalid'>Invalid email address</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control 
                            value={phoneNumber} 
                            onChange={e => setPhoneNumber(formatPhoneNumber(e.target.value))} 
                            isValid={isPhoneNumberValid(phoneNumber)}
                            isInvalid={phoneNumberClicked && phoneNumber !== '' && !isPhoneNumberValid(phoneNumber)}
                            onClick={() => setPhoneNumberClicked(false)}
                            onBlur={() => setPhoneNumberClicked(true)}
                        />
                        <Form.Control.Feedback type='valid' />
                        <Form.Control.Feedback type='invalid'>Invalid phone number</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group as={Col}>
                        <Form.Label>LinkedIn profile</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>https://</InputGroup.Text>
                            <Form.Control value={linkedInProfile.slice(8)} onChange={e => setLinkedInProfile(e.target.value)}/>
                        </InputGroup>
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
                {
                    editingContact
                        ? (
                            <Button variant='primary' disabled>
                                <Spinner
                                    as='span'
                                    animation='border'
                                    size='sm'
                                    role='status'
                                    className='me-1'
                                />
                                Editing Contact
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

export default EditContactModal;
