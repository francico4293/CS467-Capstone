import React from 'react';
import Sidebar from '../components/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Filter from '../components/Filter';

const Contacts = () => {
    return (
        <Container fluid>
            <Row>
                <Sidebar/>
                <Col xs={10} sm={9} md={10} className='ms-auto'>
                    <Row className='mt-3'>
                        <Col className='d-flex flex-wrap justify-content-between align-items-center'>
                            <Button variant='secondary'>Add Contact</Button>
                            <Filter/>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Contacts;
