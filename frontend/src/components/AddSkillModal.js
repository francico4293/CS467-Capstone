import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddSkillModal = ({ show, setShow }) => {
    const theme = useSelector(state => state.theme);
    const [skillName, setSkillName] = useState('');
    const [proficiency, setProficiency] = useState(50);

    const handleClose = () => {
        setSkillName('');
        setProficiency(50);
        setShow(false);
    }

    return (
        <Modal id={`${theme}`} show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Skill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='mb-2'>
                    <Col xs={6}>
                        <Form.Group>
                            <Form.Label>Skill name</Form.Label>
                            <Form.Control type='text' value={skillName} onChange={e => setSkillName(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='d-flex align-items-center justify-content-center'>
                    <Col xs={8}>
                        <CircularProgressbar value={proficiency} text={`${proficiency}%`} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Adjust proficiency level</Form.Label>
                        <Form.Range min={0} max={100} value={proficiency} onChange={e => setProficiency(e.target.value)}/>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddSkillModal;
