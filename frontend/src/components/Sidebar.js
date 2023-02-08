import React from 'react';
import LoggedOutNavItems from './LoggedOutNavItems';
import LoggedInNavItems from './LoggedInNavItems';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
    const { user, theme } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleLightModeButtonClick = () => {
        sessionStorage.setItem('theme', 'light');
        dispatch({ type: 'THEME_CHANGE_REQUEST', payload: 'light' });
    }

    const handleDarkModeButtonClick = () => {
        sessionStorage.setItem('theme', 'dark');
        dispatch({ type: 'THEME_CHANGE_REQUEST', payload: 'dark' });
    }

    const handleToggleEvent = () => {
        if (theme === 'light') {
            handleDarkModeButtonClick();
        } else {
            handleLightModeButtonClick();
        }
    }

    return (
        <Col xs={2} sm={3} md={2} className='d-flex flex-column justify-content-between sidebar'>
            <div className='mt-5'>
                <header className='d-none d-sm-block'>
                    <h1 className='text-center text-uppercase'>Job Tracker<i className='fa-solid fa-chart-line ms-2'/></h1>
                </header>
                <header className='d-sm-none'>
                    <h1 className='text-center'>JT<i className='fa-solid fa-chart-line ms-2'/></h1>
                </header>
                <div>
                    {user ? <LoggedInNavItems/> : <LoggedOutNavItems/>}
                </div>
            </div>
            <div className='d-none d-sm-flex justify-content-center mb-5'>
                <ButtonGroup>
                    <Button variant='outline-secondary' onClick={handleLightModeButtonClick}>
                        <i className='fa-solid fa-sun me-2'/>Light
                    </Button>
                    <Button variant='outline-secondary' onClick={handleDarkModeButtonClick}>
                        <i className='fa-solid fa-moon me-2'/>Dark
                    </Button>
                </ButtonGroup>
            </div>
            <div className='d-flex d-sm-none justify-content-center align-items-center mb-5'>
                <Form.Check type='switch' onChange={handleToggleEvent} checked={theme === 'dark'}/>
                <i className='fa-solid fa-moon'/>
            </div>
        </Col>
    );
}

export default Sidebar;
