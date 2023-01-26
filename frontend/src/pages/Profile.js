import React from 'react';
import Sidebar from '../components/Sidebar';
import SkillFrequencyChart from '../components/SkillFrequencyChart';

const Profile = () => {
    return (
        <div className='container-fluid'>
            <div className='row h-100'>
                <Sidebar/>
                <div className='col-10 col-sm-9 col-md-10 ms-auto'>
                    <div className='row d-flex flex-wrap'>
                        <div className='col-md-6 col-lg-5 d-flex flex-column justify-content-evenly align-items-center border-bottom'>
                            <img src={'imgs/profile-image.svg'} className='img-thumbnail rounded-circle shadow-sm mt-3' width={'70%'}/>
                            <div className='row mt-3 me-5 ms-5 mb-3'>
                                <div className='col-12'>
                                    <h2>Colin Francis</h2>
                                    <h3>francico@oregonstate.edu</h3>
                                    <p className='mt-4'>Computer science student @ Oregon State University</p>
                                    <p className='mt-4'>Tracking 8 jobs</p>
                                    <div className='d-grid'>
                                        <button type="button" class="btn btn-secondary">Edit Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-lg-7'>
                            <SkillFrequencyChart/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
