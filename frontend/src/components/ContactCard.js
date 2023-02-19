import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import { deleteContact } from '../services/contacts';
import { getUser } from '../services/users';

const ContactCard = ({ contact, setShowEditContactModal }) => {
    const { theme, user } = useSelector(state => state); 
    const dispatch = useDispatch();
    const [showPopover, setShowPopover] = useState(false);

    const setError = (e) => {
        alert(e)
    }

    const deleteHandler = async () => {
        await deleteContact(user.auth, contact.id, setError)

        const data = await getUser(user.auth, setError);
        dispatch({ type: 'SET_USER', payload: {data, auth: user.auth} });
        setShowPopover(false)
    }
    return (
        <Card style={{ width: '25rem', minHeight: '12rem' }}>
            <div className='contact-color' style={{ backgroundColor: `${contact.color}` }}></div>
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Row className='border-bottom pb-2'>
                    <Col xs={9}>
                        <Card.Title>
                            {contact.firstName} {contact.lastName}{contact.linkedInProfile ? <i className='fa-brands fa-linkedin ms-2'/> : <></>}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{contact.company}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">{contact.jobTitle}</Card.Subtitle>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-start'>
                        <Image 
                            src={contact.contactPhoto ? contact.contactPhoto : '/img/profile-image.svg'}
                            width={'75%'}
                            fluid
                            roundedCircle
                        />
                    </Col>
                </Row>
                <Card.Text className='mt-3'>
                    <Row>
                        <Col className='fw-light'>
                            <i className='fa-solid fa-envelope me-1'/>{contact.email ? contact.email : 'None'}
                        </Col>
                    </Row>
                    <Row>
                        <Col className='fw-light'>
                            <i className='fa-solid fa-phone me-1'/>{contact.phoneNumber ? contact.phoneNumber : 'None'}
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex justify-content-end'>
                            <i className='fa-solid fa-pen me-2' onClick={() => setShowEditContactModal(true)}/>
                            <OverlayTrigger 
                                trigger='click' 
                                placement='top'
                                show={showPopover}
                                overlay={
                                    <Popover id={theme}>
                                        <Popover.Header as="h3">Delete Contact</Popover.Header>
                                        <Popover.Body>
                                            <Row>
                                                <Col className='pb-3'>
                                                    Are you sure you want to delete this contact?
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className='d-flex justify-content-end border-top pt-1'>
                                                    <Button className='me-1' onClick={() => setShowPopover(false)}>Cancel</Button>
                                                    <Button onClick={deleteHandler}>Confirm</Button>
                                                </Col>
                                            </Row>
                                        </Popover.Body>
                                    </Popover>}>
                                <i className='fa-solid fa-trash' onClick={() => setShowPopover(true)}/>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ContactCard;
