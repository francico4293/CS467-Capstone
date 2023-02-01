import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { uploadProfilePicture } from '../actions/userActions';

const EditPictureModal = ({ show, setShow, setPictureUploading }) => {
    const [picture, setPicture] = useState(null);
    const { user, theme } = useSelector(state => state);
    const dispatch = useDispatch();

    const setError = () => {
        alert("Profile update failed!");
    }

    const handleSave = () => {
        dispatch(uploadProfilePicture(user, picture, setPictureUploading));
        setShow(false);
    }

    return (
        <Modal id={`${theme}`} className='edit-picture-modal' show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-center'>
                    <img src={user.auth.photoURL ? user.auth.photoURL : `/imgs/profile-image.svg`} className='img-thumbnail shadow-sm mt-3' width={'70%'}/>
                </div>
                <div className='mt-3'>
                    <label for='profile-picture' className='form-label'>Update profile picture</label>
                    <input type="file" className="form-control" id="profile-picture" onChange={(e) => setPicture(e.target.files[0])}></input>
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
