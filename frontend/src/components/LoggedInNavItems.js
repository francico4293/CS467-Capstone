import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../actions/userActions';

const LoggedInNavItems = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    return (
        <ul className='nav flex-column mt-5'>
            <li className='nav-item'>
                <a className='nav-link active' href='/profile'>
                    <i className="fa-solid fa-user me-2"></i>
                    <span className='d-none d-sm-inline'>Profile</span>
                </a>
            </li>
            <li className='nav-item'>
                <a className='nav-link'>
                    <i className="fa-solid fa-chess-board me-2"></i>
                    <span className='d-none d-sm-inline'>Job Board</span>
                </a>
            </li>
            <li className='nav-item'>
                <a className='nav-link'>
                    <i className="fa-solid fa-address-book me-2"></i>
                    <span className='d-none d-sm-inline'>Contacts</span>
                </a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' onClick = {() => dispatch(signOutUser(navigate))}>
                    <i className="fa-solid fa-right-from-bracket me-2"></i>
                    <span className='d-none d-sm-inline'>Logout</span>
                </a>
            </li>
        </ul>
    );
}

export default LoggedInNavItems;
