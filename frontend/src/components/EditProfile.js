import React from 'react';

const EditProfile = ({ setEditing }) => {
    return (
        <>
            <div className='row mb-2'>
                <div className='col-12'>
                    <label for='profile-picture' className='form-label'>Update profile picture</label>
                    <input type="file" className="form-control" id="profile-picture"></input>
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-6'>
                    <label for='first-name' className='form-label'>First name</label>
                    <input type='text' className='form-control' id='first-name' value='Colin'/>
                </div>
                <div className='col-6'>
                    <label for='last-name' className='form-label'>Last name</label>
                    <input type='text' className='form-control' id='last-name' value='Francis'/>
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col-12'>
                    <label for='email' className='form-label'>Email</label>
                    <input type='email' className='form-control' id='email' value='francico@oregonstate.edu'/>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <label for="bio" className="form-label">Bio</label>
                    <textarea className="form-control" id="bio" rows="2" value='Computer science @ Oregon State University'></textarea>
                </div>
            </div>
            <p className='mt-4'>Tracking 8 jobs</p>
            <div className='d-flex justify-content-end'>
                <button type="button" className="btn btn-secondary me-2" onClick={() => setEditing(false)}>Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </div>
        </>
    );
}

export default EditProfile;
