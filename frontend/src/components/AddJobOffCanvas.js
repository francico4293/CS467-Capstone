import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const AddJobOffCanvas = ({ show, setShow }) => {
    const handleClose = () => {
        setShow(false);
    }
    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Create a Job to Track</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            </Offcanvas.Body>
        </Offcanvas>
        );
}

export default AddJobOffCanvas;
