import React from 'react';
import Sidebar from '../components/Sidebar';
import LoginSignupForm from '../components/LoginSignupForm';

const LoginSignup = ({ user, isLightMode, setLightMode }) => {
    return (
        <div className='container-fluid'>
            <div className='row h-100'>
                <Sidebar user={user} isLightMode={isLightMode} setLightMode={setLightMode}/>
                <div className='col-10 col-sm-9 col-md-10 ms-auto'>
                    <div className='row h-100 d-flex justify-content-center align-items-center'>
                        <div className='form-wrapper d-flex justify-content-center'>
                            <div className='col-lg-6 col-xl-4 d-none d-lg-block login-image'>
                                <img src={'/imgs/login.jpg'} className='img-fluid'/>
                            </div>
                            <div className='col-sm-10 col-md-8 col-lg-6 col-xl-4 p-5 form'>
                                <div>
                                    <h2 className='text-center'>Welcome!</h2>
                                    <p className='text-muted text-center'>Signup or login to start tracking jobs</p>
                                </div>
                                <div>
                                    <ul className='nav nav-tabs'>
                                        <li className='nav-item'>
                                            <a className='nav-link active' data-bs-toggle='tab' href='#login'>Login</a>
                                        </li>
                                        <li className='nav-item'>
                                            <a className="nav-link" data-bs-toggle='tab' href='#signup'>Signup</a>
                                        </li>
                                    </ul>
                                </div>
                                <LoginSignupForm/>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default LoginSignup;
