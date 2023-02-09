import React from 'react';
import Sidebar from '../components/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Filter from '../components/Filter';
import ContactCard from '../components/ContactCard';
import Pages from '../components/Pages';

const Contacts = () => {
    return (
        <Container className='contacts-container' fluid>
            <Row>
                <Sidebar/>
                <Col xs={10} sm={9} md={10} className='ms-auto'>
                    <Row className='d-flex justify-content-center mt-4'>
                        <Col xs={11} className='d-flex flex-wrap justify-content-between align-items-center'>
                            <Button variant='secondary'>Add Contact</Button>
                            <Filter/>
                        </Col>
                    </Row>
                    <Row className='d-flex justify-content-center m-5'>
                        <Col>
                            <Row>
                                <Col md={6} lg={4} className='d-flex justify-content-center mt-4'>
                                    <ContactCard/>
                                </Col>
                                <Col md={6} lg={4} className='d-flex justify-content-center mt-4'>
                                    <ContactCard/>
                                </Col>
                                <Col md={6} lg={4} className='d-flex justify-content-center mt-4'>
                                    <ContactCard/>
                                </Col>
                                <Col md={6} lg={4} className='d-flex justify-content-center mt-4'>
                                    <ContactCard/>
                                </Col>
                                <Col md={6} lg={4} className='d-flex justify-content-center mt-4'>
                                    <ContactCard/>
                                </Col>
                                <Col md={6} lg={4} className='d-flex justify-content-center mt-4'>
                                    <ContactCard/>
                                </Col>
                                <Col md={6} lg={4} className='d-flex justify-content-center mt-4'>
                                    <ContactCard/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex justify-content-center'>
                            <Pages/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Contacts;
