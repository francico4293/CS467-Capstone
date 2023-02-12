import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Filter from '../components/Filter';
import ContactCard from '../components/ContactCard';
import Pages from '../components/Pages';
import { getContacts } from '../services/contacts';
import AddContactModal from '../components/AddContactModal';
import { useSelector } from 'react-redux';

const Contacts = () => {
    const [activePage, setActivePage] = useState(0);
    const [showAddContactModal, setShowAddContactModal] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [company, setCompany] = useState(null);
    const user = useSelector(state => state.user);
    
    const companies = new Set(contacts.map(contact => contact.company));
    const filteredContacts = contacts.filter(contact => company === null ? true : company === contact.company)

    // based on 9 contacts per page
    const endIdx = (activePage + 1) * 9;
    const startIdx = endIdx - 9;

    const setError = (e) => {
        alert(e)
    }
    
    useEffect(() => {
        async function populateContacts() {
            const contacts = await getContacts(user.auth, setError)
            setContacts(contacts)
        }
        populateContacts()
    }, [user])

    useEffect(() => {
        setActivePage(0);
    }, [company]);


    return (
        <Container className='contacts-container' fluid>
            <Row>
                <Sidebar />
                <Col xs={10} className='d-flex flex-column justify-content-between ms-auto'>
                    <AddContactModal show={showAddContactModal} setShow={setShowAddContactModal} />
                    <Row className='d-flex justify-content-center mt-4'>
                        <Col sm={9} md={12} className='d-flex flex-wrap justify-content-between align-items-start'>
                            <Button variant='secondary' onClick={() => setShowAddContactModal(true)}>Add Contact</Button>
                            <Filter items={Array.from(companies)} setItem={setCompany}/>
                        </Col>
                    </Row>
                    <Row className='ms-3 me-3'>
                        <Col>
                            {
                                contacts.length > 0 
                                    ? (
                                        <Row className='justify-content-center'>
                                            {filteredContacts.slice(startIdx, endIdx).map((contact, idx) => (
                                                <Col sm={10} md={6} lg={4} className='d-flex justify-content-center mt-4' key={idx}>
                                                    <ContactCard contact={contact} />
                                                </Col>
                                            ))}
                                        </Row>
                                    ) : <p className='text-center text-muted fs-1'>You don't have any contacts</p>
                            }
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <Pages numberOfContacts={filteredContacts.length} activePage={activePage} setActivePage={setActivePage} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Contacts;
