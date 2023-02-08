import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { signOutUser } from '../services/users';

const LoggedInNavItems = () => {
    const location = useLocation();

    return (
        <Nav className='flex-column mt-5' activeKey={location.pathname}>
            <Nav.Item>
                <Nav.Link href='/profile'>
                    <i className='fa-solid fa-user me-2'/>
                    <span className='d-none d-sm-inline'>Profile</span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/job-board'>
                    <i className='fa-solid fa-chess-board me-2'/>
                    <span className='d-none d-sm-inline'>Job Board</span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/contacts'>
                    <i className='fa-solid fa-address-book me-2'/>
                    <span className='d-none d-sm-inline'>Contacts</span>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/logout' onClick={() => signOutUser()}>
                    <i className='fa-solid fa-right-from-bracket me-2'/>
                    <span className='d-none d-sm-inline'>Logout</span>
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default LoggedInNavItems;
