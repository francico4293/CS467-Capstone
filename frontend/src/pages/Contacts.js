import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Filter from '../components/Filter';
import ContactCard from '../components/ContactCard';
import Pages from '../components/Pages';

const Contacts = () => {
    const [activePage, setActivePage] = useState(0);

    const contacts = [
        "Dennis Reynolds", 
        "Harry Potter", 
        "Shoei Otani", 
        "Nick Chubb", 
        "LeBron James", 
        "Bill Gates", 
        "Joe Smith", 
        "John Doe", 
        "Jane Doe", 
        "Fake Name", 
        "Real Name", 
        "Mario", 
        "Dee Reynolds", 
        "Charlie Kelly"
    ];

    const endIdx = (activePage + 1) * 9;
    const startIdx = endIdx - 9;

    return (
        <Container className='contacts-container' fluid>
            <Row>
                <Sidebar/>
                <Col xs={10} className='d-flex flex-column justify-content-between ms-auto'>
                    <Row className='d-flex justify-content-center mt-4 ms-1 me-1'>
                        <Col className='d-flex flex-wrap justify-content-between align-items-start'>
                            <Button variant='secondary'>Add Contact</Button>
                            <Filter/>
                        </Col>
                    </Row>
                    <Row className='ms-3 me-3'>
                        <Col>
                            <Row className='justify-content-center'>
                                {contacts.slice(startIdx, endIdx).map((contact, idx) => (
                                    <Col md={6} lg={4} className='d-flex justify-content-center mt-4'>
                                        <ContactCard name={contact} key={idx}/>
                                    </Col>
                                ))}
                            </Row>
                            
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <Pages activePage={activePage} setActivePage={setActivePage}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Contacts;
