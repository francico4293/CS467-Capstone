import React from 'react';

const ShowProfile = ({ setEditing }) => {
    return (
        <>
            <h2>Colin Francis</h2>
            <h3>francico@oregonstate.edu</h3>
            <p className='mt-4'>Computer science student @ Oregon State University</p>
            <p className='mt-4'>Tracking 8 jobs</p>
            <div className='d-grid'>
                <button type="button" className="btn btn-secondary" onClick={() => setEditing(true)}>Edit Profile</button>
            </div>
        </>
    );
}

export default ShowProfile;
