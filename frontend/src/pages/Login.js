import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ErrorAlert from '../components/ErrorAlert';
import PasswordResetModal from '../components/PasswordResetModal';
import SuccessAlert from '../components/SuccessAlert';

const Login = () => {
    const [loginError, setLoginError] = useState(false);
    const [signupError, setSignupError] = useState(false);
    const [signupErrorMessage, setSignupErrorMessage] = useState('');
    const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
    const [showPasswordResetSuccess, setShowPasswordResetSuccess] = useState(false);
    const [showPasswordResetFailure, setShowPasswordResetFailure] = useState(false);
    

    return (
        <Container fluid>
            <Row>
                <Sidebar/>
                <Col xs={10} sm={9} md={10} className='ms-auto'>
                    <PasswordResetModal show={showPasswordResetModal} setShow={setShowPasswordResetModal} setShowPasswordResetSuccess={setShowPasswordResetSuccess} setShowPasswordResetFailure={setShowPasswordResetFailure}/>
                    <ErrorAlert message={'Login failed!'} show={loginError} setShow={setLoginError}/>
                    <ErrorAlert message={signupErrorMessage} show={signupError} setShow={setSignupError}/>
                    <ErrorAlert message={'We were unable to send a password reset link!'} show={showPasswordResetFailure} setShow={setShowPasswordResetFailure}/>
                    <SuccessAlert message={'A password reset link has been sent to your email!'} show={showPasswordResetSuccess} setShow={setShowPasswordResetSuccess}/>
                    <Row className='d-flex justify-content-center align-items-center login-container'>
                        <div className='d-flex justify-content-center'>
                            <Col lg={6} xl={4} className='d-none d-lg-block login-image'>
                                <Image src={'/img/login.jpg'} fluid/>
                            </Col>
                            <Col sm={10} md={8} lg={6} xl={4} className='p-5 form'>
                                <div>
                                    <h2 className='text-center'>Welcome!</h2>
                                    <p className='text-muted text-center'>Signup or login to start tracking jobs</p>
                                </div>
                                <Tabs variant='tabs' defaultActiveKey='login'>
                                    <Tab eventKey='login' title='Login'>
                                        <LoginForm setLoginError={setLoginError} setShowPasswordResetModal={setShowPasswordResetModal}/>
                                    </Tab>
                                    <Tab eventKey='signup' title='Signup'>
                                        <SignupForm setSignupError={setSignupError} setSignupErrorMessage={setSignupErrorMessage}/>
                                    </Tab>
                                </Tabs>
                            </Col>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;
