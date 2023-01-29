import React from 'react';

const LoggedOutNavItems = () => {
    return (
        <ul className='nav flex-column mt-5'>
            <li className='nav-item'>
                <a className='nav-link active' href='/profile'>
                    <i className="fa-solid fa-right-to-bracket me-2"></i>
                    <span className='d-none d-sm-inline'>Login</span>
                </a>
            </li>
        </ul>
    );
}

export default LoggedOutNavItems;
