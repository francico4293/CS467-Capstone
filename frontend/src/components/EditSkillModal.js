import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { editSkill } from '../services/skills';
import { getUser } from '../services/users';

const EditSkillModal = ({ skillToEdit, show, setShow }) => {
    const {user, theme} = useSelector(state => state);
    const dispatch = useDispatch();
    const [skillName, setSkillName] = useState(skillToEdit.name);
    const [proficiency, setProficiency] = useState(skillToEdit.proficiency);

    const handleClose = () => {
        setShow(false);
    }

    const handleSubmit = async () => {

        await editSkill(user.auth, skillToEdit.id, {name: skillName, proficiency}, setError)

        const data = await getUser(user.auth, setError);
        dispatch({ type: 'SET_USER', payload: { data, auth: user.auth } });
        handleClose()
    }

    const setError = (e) => {
        alert(e)
    }

    useEffect(() => {
        setSkillName(skillToEdit.name);
        setProficiency(skillToEdit.proficiency);
    }, [show]);

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
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditSkillModal;
