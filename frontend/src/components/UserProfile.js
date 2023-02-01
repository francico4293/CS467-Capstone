import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = ({ setShowEditProfileModal }) => {
    const user = useSelector(state => state.user);

    return (
        <div id='bio'>
            <h2>{`${user.data.firstName} ${user.data.lastName}`}</h2>
            <h3>{`${user.data.email}`}</h3>
            <p className='mt-4'>{`${user.data.description}`}</p>
            <p className='mt-4'>{`Tracking ${user.data.jobs.length} jobs`}</p>
            <div className='d-grid'>
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditProfileModal(true)}>Edit Profile</button>
            </div>
        </div>
    );
}

export default UserProfile;
