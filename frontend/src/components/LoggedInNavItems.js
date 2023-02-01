import React from 'react';
import { signOutUser } from '../services/users';

const LoggedInNavItems = () => {
    return (
        <ul className='nav flex-column mt-5'>
            <li className='nav-item'>
                <a className='nav-link active' href='/profile'>
                    <i className="fa-solid fa-user me-2"></i>
                    <span className='d-none d-sm-inline'>Profile</span>
                </a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='/job-board'>
                    <i className="fa-solid fa-chess-board me-2"></i>
                    <span className='d-none d-sm-inline'>Job Board</span>
                </a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='/contacts'>
                    <i className="fa-solid fa-address-book me-2"></i>
                    <span className='d-none d-sm-inline'>Contacts</span>
                </a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' onClick = {() => signOutUser()}>
                    <i className="fa-solid fa-right-from-bracket me-2"></i>
                    <span className='d-none d-sm-inline'>Logout</span>
                </a>
            </li>
        </ul>
    );
}

export default LoggedInNavItems;
