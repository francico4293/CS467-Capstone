import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const ContactCard = ({ name }) => {
    return (
        <Card style={{ width: '25rem', minHeight: '12rem' }}>
            <div className='contact-color' style={{ backgroundColor: 'aqua' }}></div>
            <Card.Body>
                <Card.Title>{name}<i className='fa-brands fa-linkedin ms-2'/></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Google</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Sr. Software Engineer</Card.Subtitle>
                <Card.Text className='mt-3'>
                    <Row>
                        <Col className='fw-light'>
                            <i className='fa-solid fa-envelope me-1'/>fakeemail@gmail.com
                        </Col>
                    </Row>
                    <Row>
                        <Col className='fw-light'>
                            <i className='fa-solid fa-phone me-1'/>123-456-7890
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
