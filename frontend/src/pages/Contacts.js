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
                                {contacts.slice(startIdx, endIdx).map((contact, idx) => (
                                    <Col md={6} lg={4} className='d-flex justify-content-center mt-4'>
                                        <ContactCard name={contact} key={idx}/>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex justify-content-center'>
                            <Pages activePage={activePage} setActivePage={setActivePage}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Contacts;
