import React from 'react';
import Sidebar from '../components/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '../components/Filter';

const JobBoard = () => {
    return (
        <Container fluid>
            <Row>
                <Sidebar/>
                <Col xs={10} sm={9} md={10} className='ms-auto'>
                    <Row className='mt-3 mb-3'>
                        <Col className='d-flex border-bottom pb-3'>
                            <Filter items={[]} setItems={null}/>
                            <Filter items={[]} setItems={null}/>
                            <Filter items={[]} setItems={null}/>
                        </Col>
                    </Row>
                    <Row className='d-flex flex-nowrap'>
                        <Col xs={3} className='test me-3 ms-3'></Col>
                        <Col xs={3} className='test me-3'></Col>
                        <Col xs={3} className='test me-3'></Col>
                        <Col xs={3} className='test me-3'></Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default JobBoard;
