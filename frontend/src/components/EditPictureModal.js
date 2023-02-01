import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditPictureModal = ({ show, setShow }) => {
    const theme = useSelector(state => state.theme);

    const handleClose = () => {
        setShow()
    }

    const handleSave = () => {

    }

    return (
        <Modal id={`${theme}`} className='edit-picture-modal' show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-center'>
                    <img src={'imgs/profile-image.svg'} className='img-thumbnail rounded-circle shadow-sm mt-3' width={'70%'}/>
                </div>
                <div className='mt-3'>
                    <label for='profile-picture' className='form-label'>Update profile picture</label>
                    <input type="file" className="form-control" id="profile-picture"></input>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditPictureModal;
