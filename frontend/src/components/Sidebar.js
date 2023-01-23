import React from 'react';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
    return (
        <nav className='d-flex flex-column justify-content-between col-2 sidebar'>
            <div className='mt-5'>
                <header>
                    <h1 className='text-center'>Job Tracker<i className="fa-solid fa-chart-line ms-2"></i></h1>
                </header>
                <div>
                    <ul className='nav flex-column mt-5'>
                        <li className='nav-item'>
                            <a className='nav-link active'><i className="fa-solid fa-user me-2"></i>Profile</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link'><i className="fa-solid fa-chess-board me-2"></i>Job Board</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link'><i className="fa-solid fa-address-book me-2"></i>Contacts</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link'><i className="fa-solid fa-right-from-bracket me-2"></i>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className='d-flex justify-content-center mb-5'>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-secondary"><i className="fa-solid fa-sun me-2"></i>Light</button>
                    <button type="button" className="btn btn-outline-secondary"><i className="fa-solid fa-moon me-2"></i>Dark</button>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
