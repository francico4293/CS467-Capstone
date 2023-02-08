import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import ProficiencyCard from '../components/ProficiencyCard';
import SkillFrequencyChart from '../components/SkillFrequencyChart';
import AddSkillModal from '../components/AddSkillModal';
import EditSkillModal from '../components/EditSkillModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import EditPictureModal from '../components/EditPictureModal';
import EditProfileModal from '../components/EditProfileModal';

const Profile = () => {
    const { user, theme } = useSelector(state => state);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showAddSkillModal, setShowAddSkillModal] = useState(false);
    const [showEditSkillModal, setShowEditSkillModal] = useState(false);
    const [showEditPictureModal, setShowEditPictureModal] = useState(false);
    const [pictureUploading, setPictureUploading] = useState(false);
    const [skillToEdit, setSkillToEdit] = useState({ skillName: '', proficiency: 0 });

    return (
        <Container fluid>
            <Row>
                <Sidebar/>
                <Col xs={10} sm={9} md={10} className='ms-auto'>
                    <EditProfileModal show={showEditProfileModal} setShow={setShowEditProfileModal}/>
                    <AddSkillModal show={showAddSkillModal} setShow={setShowAddSkillModal}/>
                    <EditSkillModal skillToEdit={skillToEdit} show={showEditSkillModal} setShow={setShowEditSkillModal}/>
                    <EditPictureModal show={showEditPictureModal} setShow={setShowEditPictureModal} setPictureUploading={setPictureUploading}/>
                    <Row className='d-flex flex-wrap justify-content-evenly mt-5 me-3 ms-3'>
                        <Col md={3} className='d-flex flex-column justify-content-start align-items-center mb-3'>
                            <Image 
                                src={user.auth.photoURL ? user.auth.photoURL : `/img/profile-image.svg`}
                                className={`border shadow-sm ${theme === 'dark' ? 'bg-light' : ''} mt-3 profile-picture`}
                                width={'100%'}
                                roundedCircle
                                onClick={() => setShowEditPictureModal(true)}
                            />
                            {pictureUploading}
                            <Row className='w-100 mt-3 me-5 ms-5 mb-3'>
                                <Col>
                                    <UserProfile setShowEditProfileModal={setShowEditProfileModal}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={8} className='profile-content'>
                            <SkillFrequencyChart/>
                        </Col>
                    </Row>
                    <Row className='d-flex flex-wrap justify-content-evenly mt-3 me-3 ms-3 mb-5'>
                        <Col md={3}></Col>
                        <Col md={8} className='profile-content p-3'>
                            <div className='d-flex justify-content-center align-items-center round-button' onClick={() => setShowAddSkillModal(true)}>
                                <i className='fa-solid fa-plus fa-2x'/>
                            </div>
                            <Row>
                                <Col xs={9}>
                                    <h2>Your Skills</h2>
                                    <p>Manage your skills and track your proficiency level</p>
                                </Col>
                            </Row>
                            <Row className='d-flex flex-wrap justify-content-evenly'>
                                <Col lg={5} className='mt-3'>
                                    <ProficiencyCard 
                                        skillName='Java' 
                                        proficiency='75' 
                                        setSkillToEdit={setSkillToEdit} 
                                        setShowEditSkillModal={setShowEditSkillModal}
                                    />
                                </Col>
                                <Col lg={5} className='mt-3'>
                                    <ProficiencyCard 
                                        skillName='Python' 
                                        proficiency='95' 
                                        setSkillToEdit={setSkillToEdit} 
                                        setShowEditSkillModal={setShowEditSkillModal}
                                    />
                                </Col>
                                <Col lg={5} className='mt-3'>
                                    <ProficiencyCard 
                                        skillName='Docker' 
                                        proficiency='15' 
                                        setSkillToEdit={setSkillToEdit} 
                                        setShowEditSkillModal={setShowEditSkillModal}
                                    />
                                </Col>
                                <Col lg={5} className='mt-3'>
                                    <ProficiencyCard 
                                        skillName='React.js' 
                                        proficiency='80' 
                                        setSkillToEdit={setSkillToEdit} 
                                        setShowEditSkillModal={setShowEditSkillModal}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;
