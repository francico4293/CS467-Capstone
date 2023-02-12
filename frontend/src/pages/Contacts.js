import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Filter from '../components/Filter';
import ContactCard from '../components/ContactCard';
import Pages from '../components/Pages';
import { fakeContacts } from '../fakeContacts';
import AddContactModal from '../components/AddContactModal';

const Contacts = () => {
    const [activePage, setActivePage] = useState(0);
    const [showAddContactModal, setShowAddContactModal] = useState(false);
    const [company, setCompany] = useState(null);
    const [contacts, setContacts] = useState(fakeContacts);
    const [companies, setCompanies] = useState(new Set(fakeContacts.map(contact => contact.company)));

    // based on 9 contacts per page
    const endIdx = (activePage + 1) * 9;
    const startIdx = endIdx - 9;

    useEffect(() => {
        setContacts(fakeContacts.filter(contact => company === null ? true : company === contact.company));
        setActivePage(0);
    }, [company]);

    return (
        <Container className='contacts-container' fluid>
            <Row>
                <Sidebar/>
                <Col xs={10} className='d-flex flex-column justify-content-between ms-auto'>
                    <AddContactModal show={showAddContactModal} setShow={setShowAddContactModal}/>
                    <Row className='d-flex justify-content-center mt-4'>
                        <Col sm={9} md={12} className='d-flex flex-wrap justify-content-between align-items-start'>
                            <Button variant='secondary' onClick={() => setShowAddContactModal(true)}>Add Contact</Button>
                            <Filter items={Array.from(companies)} setItem={setCompany}/>
                        </Col>
                    </Row>
                    <Row className='ms-3 me-3'>
                        <Col>
                            <Row className='justify-content-center'>
                                {contacts.slice(startIdx, endIdx).map((contact, idx) => (
                                    <Col sm={10} md={6} lg={4} className='d-flex justify-content-center mt-4' key={idx}>
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
