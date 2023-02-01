import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import SkillFrequencyChart from '../components/SkillFrequencyChart';
import ProficiencyCard from '../components/ProficiencyCard';
import AddSkillModal from '../components/AddSkillModal';
import EditSkillModal from '../components/EditSkillModal';
import EditProfileModal from '../components/EditProfileModal';
import EditPictureModal from '../components/EditPictureModal';

const Profile = () => {
    const user = useSelector(state => state.user);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showAddSkillModal, setShowAddSkillModal] = useState(false);
    const [showEditSkillModal, setShowEditSkillModal] = useState(false);
    const [showEditPictureModal, setShowEditPictureModal] = useState(false);
    const [pictureUploading, setPictureUploading] = useState(false);
    const [skillToEdit, setSkillToEdit] = useState({ skillName: '', proficiency: 0 });

    return (
        <div className='container-fluid h-100'>
            <div className='row h-100'>
                <Sidebar/>
                <div className='col-10 col-sm-9 col-md-10 ms-auto'>
                    <AddSkillModal show={showAddSkillModal} setShow={setShowAddSkillModal}/>
                    <EditSkillModal skillToEdit={skillToEdit} show={showEditSkillModal} setShow={setShowEditSkillModal}/>
                    <EditProfileModal show={showEditProfileModal} setShow={setShowEditProfileModal}/>
                    <EditPictureModal show={showEditPictureModal} setShow={setShowEditPictureModal} setPictureUploading={setPictureUploading}/>
                    <div className='row d-flex flex-wrap'>
                        <div className='col-md-6 col-lg-5 d-flex flex-column justify-content-evenly align-items-center border-bottom'>
                            {
                                pictureUploading 
                                    ? (
                                        <div className='spinner-border' role='status'>
                                            <span className='visually-hidden'>Loading...</span>
                                        </div>
                                    ) : <img src={user.auth.photoURL ? user.auth.photoURL : `/imgs/profile-image.svg`} className='img-thumbnail shadow-sm mt-3' width={'70%'} onClick={() => setShowEditPictureModal(true)}/>
                            }
                            <div className='row mt-3 me-5 ms-5 mb-3 w-75'>
                                <div className='col-12'>
                                    <UserProfile setShowEditProfileModal={setShowEditProfileModal}/>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-lg-7 canvas-col'>
                            <SkillFrequencyChart/>
                        </div>
                    </div>
                    <div className='row mt-3 ms-3'>
                        <div className='col' id='skills'>
                            <h2>Your Skills</h2>
                            <p>Manage your skills and track your proficiency level</p>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center mb-5'>
                        <div className='col-10'>
                            <div className='row'>
                                <div className='col-md-6 col-lg-4'> 
                                    <ProficiencyCard skillName={'Java'} proficiency={75} setSkillToEdit={setSkillToEdit} setShowEditSkillModal={setShowEditSkillModal}/>
                                </div>
                                <div className='col-md-6 col-lg-4'> 
                                    <ProficiencyCard skillName={'Python'} proficiency={90} setSkillToEdit={setSkillToEdit} setShowEditSkillModal={setShowEditSkillModal}/>
                                </div>
                                <div className='col-md-6 col-lg-4'> 
                                    <ProficiencyCard skillName={'C++'} proficiency={30} setSkillToEdit={setSkillToEdit} setShowEditSkillModal={setShowEditSkillModal}/>
                                </div>
                                <div className='col-md-6 col-lg-4'> 
                                    <ProficiencyCard skillName={'Docker'} proficiency={20} setSkillToEdit={setSkillToEdit} setShowEditSkillModal={setShowEditSkillModal}/> 
                                </div>
                                <div className='col-md-6 col-lg-4'> 
                                    <button type="button" className="btn btn-secondary mt-3" onClick={() => setShowAddSkillModal(true)}>
                                        Add Skill
                                    </button>
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
