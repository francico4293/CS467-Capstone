import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Filter from '../components/Filter';
import ContactCard from '../components/ContactCard';
import Pages from '../components/Pages';
import { contacts } from '../fakeContacts';

const Contacts = () => {
    const [activePage, setActivePage] = useState(0);

    // based on 9 contacts per page
    const endIdx = (activePage + 1) * 9;
    const startIdx = endIdx - 9;

    const companies = new Set(contacts.map(contact => contact.company));

    return (
        <Container className='contacts-container' fluid>
            <Row>
                <Sidebar/>
                <Col xs={10} className='d-flex flex-column justify-content-between ms-auto'>
                    <Row className='d-flex justify-content-center ms-1 me-1 mt-4'>
                        <Col className='d-flex flex-wrap justify-content-between align-items-start'>
                            <Button variant='secondary'>Add Contact</Button>
                            <Filter items={Array.from(companies)}/>
                        </Col>
                    </Row>
                    <Row className='ms-3 me-3'>
                        <Col>
                            <Row className='justify-content-center'>
                                {contacts.slice(startIdx, endIdx).map((contact, idx) => (
                                    <Col md={6} lg={4} className='d-flex justify-content-center mt-4' key={idx}>
                                        <ContactCard contact={contact}/>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <Pages numberOfContacts={contacts.length} activePage={activePage} setActivePage={setActivePage}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Contacts;
