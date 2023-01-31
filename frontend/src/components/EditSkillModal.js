import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditSkillModal = ({ skillToEdit, show, setShow }) => {
    const theme = useSelector(state => state.theme);
    const [skillName, setSkillName] = useState(skillToEdit.skillName);
    const [proficiency, setProficiency] = useState(skillToEdit.proficiency);

    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        setSkillName(skillToEdit.skillName);
        setProficiency(skillToEdit.proficiency);
    }, [show]);

    return (
        <Modal id={`${theme}`} className='edit-proficiency-modal' show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Skill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row mb-2'>
                    <div className='col-6'>
                        <label for='skill' className='form-label'>Skill name</label>
                        <input type='text' className='form-control' id='skill' value={skillName} onChange={e => setSkillName(e.target.value)}/>
                    </div>
                </div>
                <div className='row d-flex align-items-center justify-content-center'>
                    <div className='col-8'>
                        <CircularProgressbar value={proficiency} text={`${proficiency}%`} />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col'>
                        <label for="proficiencyRange" className="form-label">Adjust proficiency level</label>
                        <input type="range" className="form-range" min={0} max={100} value={proficiency} id="proficiencyRange" 
                            onChange={e => setProficiency(e.target.value)}></input>
                    </div>
                </div>
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

export default EditSkillModal;
