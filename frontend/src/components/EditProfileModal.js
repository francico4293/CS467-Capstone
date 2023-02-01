import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editUser } from '../actions/userActions';
// import { editUser } from '../services/users';

const EditProfileModal = ({ show, setShow }) => {
    const dispatch = useDispatch();
    const { user, theme } = useSelector(state => state);

    const [picture, setPicture] = useState(user.data.picture);
    const [firstName, setFirstName] = useState(user.data.firstName);
    const [lastName, setLastName] = useState(user.data.lastName);
    const [email, setEmail] = useState(user.data.email);
    const [description, setDescription] = useState(user.data.description);

    const setError = () => {
        alert("Profile update failed!");
    }

    const handleSave = async () => {
        // const data = await editUser(user.auth, { firstName, lastName, email, description }, setError);
        dispatch(editUser(user.auth, { firstName, lastName, email, description }), setError);
        setShow(false);
    }

    const handleClose = () => {
        setFirstName(user.data.firstName);
        setLastName(user.data.lastName);
        setEmail(user.data.email);
        setDescription(user.data.description);
        setShow(false);
    }

    return (
        <Modal id={`${theme}`} className='edit-proficiency-modal' show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id='edit-bio'>
                    {/* <div className='row mb-2'>
                        <div className='col-12'>
                            <label for='profile-picture' className='form-label'>Update profile picture</label>
                            <input type="file" className="form-control" id="profile-picture" onChange={(e) => setPicture(e.target.files[0])}></input>
                        </div>
                    </div> */}
                    <div className='row mb-2'>
                        <div className='col-6'>
                            <label for='first-name' className='form-label'>First name</label>
                            <input type='text' className='form-control' id='first-name' value={firstName} onChange={e => setFirstName(e.target.value)}/>
                        </div>
                        <div className='col-6'>
                            <label for='last-name' className='form-label'>Last name</label>
                            <input type='text' className='form-control' id='last-name' value={lastName} onChange={e => setLastName(e.target.value)}/>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <label for='email' className='form-label'>Email</label>
                            <input type='email' className='form-control' id='email' value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <label for="bio" className="form-label">Bio</label>
                            <textarea className="form-control" id="bio" rows="2" value={description} onChange={e=> setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
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

export default EditProfileModal;
