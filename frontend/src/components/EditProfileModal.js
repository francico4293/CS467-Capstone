import React, { useState } from 'react';
import { 
    useSelector, 
    useDispatch
} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editUser } from '../actions/userActions';
import { updateUserPassword } from '../services/users';

const EditProfileModal = ({ show, setShow }) => {
    const dispatch = useDispatch();
    const { user, theme } = useSelector(state => state);
    const [firstName, setFirstName] = useState(user.data.firstName);
    const [lastName, setLastName] = useState(user.data.lastName);
    const [email, setEmail] = useState(user.data.email);
    const [description, setDescription] = useState(user.data.description);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [deleteAccountPassword, setDeleteAccountPassword] = useState('');
    const [updatePasswordError, setUpdatePasswordError] = useState(false);
    const [deleteAccountError, setDeleteAccountError] = useState(false);

    const setError = () => {
        alert("Profile update failed!");
    }

    const handleBioUpdate = async () => {
        dispatch(editUser(user.auth, { firstName, lastName, email, description }), setError);
        setShow(false);
    }

    const handlePasswordUpdate = async () => {
        try {
            if (newPassword !== confirmPassword) {
                throw new Error();
            }

            await updateUserPassword(user, currentPassword, newPassword);

            setShow(false);
            sessionStorage.setItem('showPasswordUpdateAlert', true);

            window.location.reload();
        } catch (error) {
            setUpdatePasswordError(true);
        }
    }

    const handleClose = () => {
        setFirstName(user.data.firstName);
        setLastName(user.data.lastName);
        setEmail(user.data.email);
        setDescription(user.data.description);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setDeleteAccountPassword('');
        setUpdatePasswordError(false);
        setDeleteAccountError(false);
        setShow(false);
    }

    return (
        <Modal id={`${theme}`} className='edit-proficiency-modal' show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <div className='mt-2 p-2'>
                <ul className='nav nav-tabs'>
                    <li className='nav-item'>
                        <a className='nav-link active' data-bs-toggle='tab' href='#edit-bio'>Bio</a>
                    </li>
                    <li className='nav-item'>
                        <a className="nav-link" data-bs-toggle='tab' href='#edit-password'>Password</a>
                    </li>
                    <li className='nav-item'>
                        <a className="nav-link" data-bs-toggle='tab' href='#delete-account'>Delete Account</a>
                    </li>
                </ul>
            </div>
            <Modal.Body>
                <div className='tab-content'>
                    <div className='tab-pane active' id='edit-bio' role='tabpanel'>
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
                        <div className='row mb-3'>
                            <div className='col-12'>
                                <label for="bio" className="form-label">Bio</label>
                                <textarea className="form-control" id="bio" rows="2" value={description} onChange={e=> setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleBioUpdate}>
                                Update
                            </Button>
                        </Modal.Footer>
                    </div>

                    <div className='tab-pane' id='edit-password' role='tabpanel'>
                        <div className='row mb-2'>
                            <div className='col-12'>
                                <label for='current-password' className='form-label'>Current Password</label>
                                <input type='password' className='form-control' id='current-password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className='col-12'>
                                <label for='new-password' className='form-label'>New Password</label>
                                <input type='password' className='form-control' id='new-password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-12'>
                                <label for='confirm-password' className='form-label'>Confirm Password</label>
                                <input type='password' className='form-control' id='confirm-password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                            </div>
                        </div>
                        {
                            updatePasswordError 
                                ? (
                                    <div className='text-danger'>
                                        <p>Failed to update password:</p>
                                        <ul>
                                            <li>Verify that current password is correct</li>  
                                            <li>Verify that new password matches confirm password field</li> 
                                        </ul>
                                    </div>
                                ) : <></>
                        }
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handlePasswordUpdate}>
                                Update
                            </Button>
                        </Modal.Footer>
                    </div>

                    <div className='tab-pane' id='delete-account' role='tabpanel'>
                        <p>Your account will be permanently deleted and will not be able to be recovered.</p>
                        <div className='row mb-2'>
                            <div className='col-12'>
                                <label for='current-password' className='form-label'>Password</label>
                                <input type='password' className='form-control' id='current-password' value={deleteAccountPassword} 
                                    onChange={e => setDeleteAccountPassword(e.target.value)}/>
                            </div>
                        </div>
                        {
                            deleteAccountError 
                                ? (
                                    <div className='text-danger'>
                                        <p>Failed to delete account:</p>
                                        <ul>
                                            <li>Verify password is correct</li>
                                        </ul>
                                    </div>
                                ) : <></>
                        }
                        <Modal.Footer className='justify-content-center'>
                            <Button variant="danger">
                                Permanently Delete Account
                            </Button>
                        </Modal.Footer>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default EditProfileModal;

{/* <Modal id={`${theme}`} className='edit-proficiency-modal' show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div className=''>
            <ul className='nav nav-tabs'>
                <li className='nav-item'>
                    <a className='nav-link active' data-bs-toggle='tab' href='#edit-bio'>Bio</a>
                </li>
                <li className='nav-item'>
                    <a className="nav-link" data-bs-toggle='tab' href='#edit-password'>Password</a>
                </li>
                <li className='nav-item'>
                    <a className="nav-link" data-bs-toggle='tab' href='#'>Account</a>
                </li>
            </ul>
        </div>

        <div className='tab-content'>
            <div className='tab-pane mt-3 active' id='edit-bio' role='tabpanel'>
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

            <div className='tab-pane mt-3' id='edit-password' role='tabpanel'>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <label for='current-password' className='form-label'>Current Password</label>
                        <input type='password' className='form-control' id='current-password' value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <label for='new-password' className='form-label'>New Password</label>
                        <input type='password' className='form-control' id='new-password' value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-12'>
                        <label for='confirm-password' className='form-label'>Confirm Password</label>
                        <input type='password' className='form-control' id='confirm-password' value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
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
</Modal> */}
