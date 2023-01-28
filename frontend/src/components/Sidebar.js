import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { THEME_CHANGE_REQUEST } from '../constants/themeConstants';
import { signOutUser } from '../services/users';

const Sidebar = () => {
    const theme = useSelector(state => state.theme);
    const [isChecked, setChecked] = useState(theme.type === 'light' ? false : true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCheckedEvent = (target) => {
        if (theme.type === 'light') {
            dispatch({ type: THEME_CHANGE_REQUEST, payload: 'dark' });
            sessionStorage.setItem('theme', 'dark'); 
        } else {
            dispatch({ type: THEME_CHANGE_REQUEST, payload: 'light' });
            sessionStorage.setItem('theme', 'light');
        }
        setChecked(!isChecked);
    }

    console.log(theme.type);

    return (
        <div className='col-2 col-sm-3 col-md-2 d-flex flex-column justify-content-between sidebar'>
            <div className='mt-5'>
                <header className='d-none d-sm-block'>
                    <h1 className='text-center text-uppercase'>Job Tracker<i className="fa-solid fa-chart-line ms-2"></i></h1>
                </header>
                <header className='d-sm-none'>
                    <h1 className='text-center'>JT<i className="fa-solid fa-chart-line ms-2"></i></h1>
                </header>
                <div>
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
                            <a className='nav-link' onClick = {() => signOutUser(navigate)}>
                                <i className="fa-solid fa-right-from-bracket me-2"></i>
                                <span className='d-none d-sm-inline'>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className='d-none d-sm-flex justify-content-center mb-5'>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => 
                            dispatch({ type: THEME_CHANGE_REQUEST, payload: 'light' })}>
                        <i className="fa-solid fa-sun me-2"></i>Light
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => 
                            dispatch({ type: THEME_CHANGE_REQUEST, payload: 'dark' })}>
                        <i className="fa-solid fa-moon me-2"></i>Dark
                    </button>
                </div>
            </div>
            
            <div className='d-sm-none d-flex justify-content-center align-items-center mb-5'>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" 
                        onChange={({ target }) => handleCheckedEvent(target)} checked={isChecked}/>
                </div>
                <i className="fa-solid fa-moon"></i>
            </div>
        </div>
    );
}

export default Sidebar;
