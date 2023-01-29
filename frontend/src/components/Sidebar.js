import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { THEME_CHANGE_REQUEST } from '../constants/themeConstants';
import LoggedInNavItems from './LoggedInNavItems';
import LoggedOutNavItems from './LoggedOutNavItems';

const Sidebar = () => {
    const theme = useSelector(state => state.theme);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleCheckedEvent = (target) => {
        if (theme.type === 'light') {
            dispatch({ type: THEME_CHANGE_REQUEST, payload: 'dark' });
            sessionStorage.setItem('theme', 'dark'); 
        } else {
            dispatch({ type: THEME_CHANGE_REQUEST, payload: 'light' });
            sessionStorage.setItem('theme', 'light');
        }
    }

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
                    {
                        user.isLoggedIn ? <LoggedInNavItems /> : <LoggedOutNavItems />
                    }
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
                        onChange={({ target }) => handleCheckedEvent(target)} checked={theme.type === 'light' ? false : true}/>
                </div>
                <i className="fa-solid fa-moon"></i>
            </div>
        </div>
    );
}

export default Sidebar;
