import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { uploadProfilePicture } from '../actions/userActions';
import Cropper from 'react-easy-crop';

const EditPictureModal = ({ show, setShow, setPictureUploading }) => {
    const { user, theme } = useSelector(state => state);
    const [picture, setPicture] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const dispatch = useDispatch();

    const setError = () => {
        alert("Profile update failed!");
    }

    const handleSave = () => {
        dispatch(uploadProfilePicture(user, picture, setPictureUploading));
        setShow(false);
    }

    const handleClose = () => {
        setPicture(null);
        setShow(false);
    }

    return (
        <Modal id={`${theme}`} className='edit-picture-modal' show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>Update Profile Picture</Modal.Header>
            <Modal.Body>
                {
                    picture
                        ? (
                            <>
                                <div className='crop-container d-flex justify-content-center'>
                                    <Cropper
                                        image={picture}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <label for="pictureZoom" className="form-label">Zoom</label>
                                    <input type="range" className="form-range" min={1} max={3} step={0.1} value={zoom} id="pictureZoom" 
                                        onChange={e => setZoom(e.target.value)}></input>
                                </div>
                            </>
                        )
                        : <></>
                }
                <div className='mt-3'>
                    <label for='profile-picture' className='form-label'>Select image</label>
                    <input type="file" className="form-control" id="profile-picture" onChange={(e) => setPicture(URL.createObjectURL(e.target.files[0]))}></input>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
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
