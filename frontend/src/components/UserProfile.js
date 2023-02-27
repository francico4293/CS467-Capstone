import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

const UserProfile = ({ setShowEditProfileModal }) => {
    const { user } = useSelector(state => state);
    const [date, setDate] = useState(new Date());
    
    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);

        return () => {
            clearInterval(timer);
        }
    });

    return (
        <>
            <div className='bio border-bottom'>
                <p className='fw-bold'>{`${user.data.firstName} ${user.data.lastName}`}</p>
                <p className='fw-light text-break'>{`${user.data.email}`}</p>
                <p className='fw-light mb-3'>{`${user.data.description}`}</p>
                <div className='d-grid'>
                    <Button variant='secondary' onClick={() => setShowEditProfileModal(true)}>Edit Profile</Button>
                </div>
                <p className='mt-3'><i className='fa-solid fa-clock me-1'/>
                    {date.toLocaleDateString()} @ {date.toLocaleTimeString()}
                </p>
            </div>
            <div className='overview'>
                <p className='fw-light mt-3'>Profile Overview:</p>
                <p className='fw-light'><i className='fa-solid fa-chart-line me-1'/>{`Tracking ${user.data.columns.reduce((acc, column) => acc + column.jobs.length, 0)} jobs`}</p>
                <p className='fw-light'><i className='fa-solid fa-circle-nodes me-1'/>{`Managing ${user.data.contacts.length} contacts`}</p>
            </div>
        </>
    );
}

export default UserProfile;
