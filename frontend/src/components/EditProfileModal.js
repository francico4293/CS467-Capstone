import React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EditBio from './EditBio';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';

const EditProfileModal = ({ show, setShow }) => {
    const { theme } = useSelector(state => state);

    const handleClose = () => {
        setShow(false);
    }

    return (
        <Modal id={`${theme}`} className='edit-profile-modal' show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs variant='tabs' defaultActiveKey='bio'>
                    <Tab eventKey='bio' title='Update Bio'>
                        <EditBio handleClose={handleClose}/>
                    </Tab>
                    <Tab eventKey='password' title='Update Password'>
                        <UpdatePassword handleClose={handleClose}/>
                    </Tab>
                    <Tab eventKey='account' title='Delete Account'>
                        <DeleteAccount/>
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
}

export default EditProfileModal;
