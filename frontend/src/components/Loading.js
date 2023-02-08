import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    const { theme } = useSelector(state => state);

    return (
        <div className='spinner-container d-flex justify-content-center align-items-center'>
            <Spinner animation='grow' variant={theme === 'light' ? 'dark' : 'light'}/>
        </div>
    );
}

export default Loading;
