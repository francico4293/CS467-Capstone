import React from 'react';
import Nav from 'react-bootstrap/Nav';

const LoggedOutNavItems = () => {
    return (
        <Nav className='flex-column mt-5' activeKey='/login'>
            <Nav.Item>
                <Nav.Link href='/login'>
                    <i className='fa-solid fa-right-to-bracket me-2'/>
                    <span className='d-none d-sm-inline'>Login</span>
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default LoggedOutNavItems;
