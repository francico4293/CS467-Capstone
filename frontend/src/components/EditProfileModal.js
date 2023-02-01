import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditProfileModal = ({ show, setShow }) => {
    const user = useSelector(state => state.user);
    const theme = useSelector(state => state.theme);

    return (
        <Modal id={`${theme}`} className='edit-proficiency-modal' show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id='edit-bio'>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <label for='profile-picture' className='form-label'>Update profile picture</label>
                            <input type="file" className="form-control" id="profile-picture"></input>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-6'>
                            <label for='first-name' className='form-label'>First name</label>
                            <input type='text' className='form-control' id='first-name' value={user.data.firstName}/>
                        </div>
                        <div className='col-6'>
                            <label for='last-name' className='form-label'>Last name</label>
                            <input type='text' className='form-control' id='last-name' value={user.data.lastName}/>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <label for='email' className='form-label'>Email</label>
                            <input type='email' className='form-control' id='email' value={user.data.email}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <label for="bio" className="form-label">Bio</label>
                            <textarea className="form-control" id="bio" rows="2" value={user.data.description}></textarea>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={() => setShow(false)}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditProfileModal;
