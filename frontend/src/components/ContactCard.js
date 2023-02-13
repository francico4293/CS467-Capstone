import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

const ContactCard = ({ contact }) => {
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
                            <i className='fa-solid fa-pen me-2'/>
                            <i className='fa-solid fa-trash'/>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ContactCard;
