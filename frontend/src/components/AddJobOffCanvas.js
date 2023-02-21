import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddJobOffCanvas = ({ show, setShow }) => {
    const handleClose = () => {
        setShow(false);
    }
    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Create a Job</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Offcanvas.Title className='border-bottom fs-6 mb-3'>Job Info</Offcanvas.Title>
                <Row className='mb-2'>
                    <FormGroup as={Col}>
                        <Form.Label>Company</Form.Label>
                        <Form.Control/>
                    </FormGroup>
                </Row>
                <Row className='mb-2'>
                    <Form.Group xs={8} as={Col}>
                        <Form.Label>Company Logo</Form.Label>
                        <Form.Control type="file"/>
                    </Form.Group>
                    <FormGroup as={Col}>
                        <Form.Label>Job Color</Form.Label>
                        <Form.Control
                            type='color'
                            defaultValue="#563d7c"
                        />
                    </FormGroup>
                </Row>
                <Row className='mb-2'>
                    <FormGroup as={Col}>
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control/>
                    </FormGroup>
                </Row>
                <Row className='mb-2'>
                    <FormGroup as={Col}>
                        <Form.Label>Link to Job Posting</Form.Label>
                        <Form.Control/>
                    </FormGroup>
                </Row>
                <Row className='mb-3'>
                    <FormGroup as={Col}>
                        <Form.Label>City</Form.Label>
                        <Form.Control/>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>State</Form.Label>
                        <Form.Control/>
                    </FormGroup>
                </Row>
                <Offcanvas.Title className='border-bottom fs-6 mb-3'>Job Skills</Offcanvas.Title>
                <Offcanvas.Title className='border-bottom fs-6 mb-3'>Job Contacts</Offcanvas.Title>
                <Row className='mt-3'>
                    <Col className='d-flex justify-content-end'>
                        <Button className='me-2'>Create</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </Col>
                </Row>
            </Offcanvas.Body>
        </Offcanvas>
        );
}

export default AddJobOffCanvas;
