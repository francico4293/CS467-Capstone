import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import EditProfile from '../components/EditProfile';
import ShowProfile from '../components/ShowProfile';
import SkillFrequencyChart from '../components/SkillFrequencyChart';
import ProficiencyCard from '../components/ProficiencyCard';

const Profile = () => {
    const [isEditing, setEditing] = useState(false);

    return (
        <div className='container-fluid h-100'>
            <div className='row h-100'>
                <Sidebar/>
                <div className='col-10 col-sm-9 col-md-10 ms-auto'>
                    <div className='row d-flex flex-wrap'>
                        <div className='col-md-6 col-lg-5 d-flex flex-column justify-content-evenly align-items-center border-bottom'>
                            <img src={'imgs/profile-image.svg'} className='img-thumbnail rounded-circle shadow-sm mt-3' width={'70%'}/>
                            <div className='row mt-3 me-5 ms-5 mb-3'>
                                <div className='col-12'>
                                    {
                                        isEditing ? <EditProfile setEditing={setEditing}/> : <ShowProfile setEditing={setEditing}/>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-lg-7 canvas-col'>
                            <SkillFrequencyChart/>
                        </div>
                    </div>
                    <div className='row mt-3 ms-3'>
                        <div className='col'>
                            <h2>Your Skills</h2>
                            <p>Manage your skills and track your proficiency level</p>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center mb-5'>
                        <div className='col-10'>
                            <div className='row'>
                                <div className='col-md-6 col-lg-4'> 
                                    <ProficiencyCard skill={'Java'} percentage={75}/>
                                </div>
                                <div className='col-md-6 col-lg-4'> 
                                    <ProficiencyCard skill={'Python'} percentage={90}/>
                                </div>
                                <div className='col-md-6 col-lg-4'> 
                                    <ProficiencyCard skill={'C++'} percentage={30}/>
                                </div>
                                <div className='col-md-6 col-lg-4'> 
                                    <ProficiencyCard skill={'Docker'} percentage={20}/> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
