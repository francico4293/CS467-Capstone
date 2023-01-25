import React from 'react';
import Sidebar from '../components/Sidebar';

const LoginSignup = () => {
    return (
        <div className='container-fluid'>
            <div className='row h-100'>
                <Sidebar/>
                <div className='col main'>
                    <div className='row h-100 d-flex flex-wrap justify-content-center align-items-center ms-3 me-3'>
                        <div className='col-lg-4 form-half p-0 shadow login-image'>
                            <img src={'/imgs/login.jpg'} alt={'desk with phone and planner'}/>
                        </div>
                        <div className='col-lg-4 form-half shadow'>
                            <form className='pe-5 ps-5'>
                                <div className='mt-5'>
                                    <h2 className='text-center'>Welcome!</h2>
                                    <p className='text-muted text-center'>Signup or login to start tracking jobs</p>
                                </div>
                                <div>
                                    <ul className='nav nav-tabs'>
                                        <li className='nav-item'>
                                            <a className="nav-link active" data-bs-toggle='tab' href='#signup'>Signup</a>
                                        </li>
                                        <li className='nav-item'>
                                            <a className='nav-link' data-bs-toggle='tab' href='#login'>Login</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='tab-content'>
                                    <div className='tab-pane active mt-3' id='signup' role='tabpanel'>
                                        <div className='row'>
                                            <div className='col'>
                                                <div class='mb-2'>
                                                    <label for='first-name' class='form-label'>First name</label>
                                                    <input type='text' class='form-control' id='first-name'/>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div class='mb-2'>
                                                    <label for='last-name' class='form-label'>Last name</label>
                                                    <input type='text' class='form-control' id='last-name'/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div class='mb-2'>
                                                <label for='email' class='form-label'>Email</label>
                                                <input type='email' class='form-control' id='email'/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div class="mb-2">
                                                <label for="password" class="form-label">Password</label>
                                                <input type="password" class="form-control" id="password"/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="mb-2">
                                                <label for="confirm-password" class="form-label">Confirm password</label>
                                                <input type="password" class="form-control" id="password"/>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary mt-2">Signup</button>
                                        <div className='form-separator mt-3'>or</div>
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary google-button-container" type="button">
                                                <i className="fa-brands fa-google"></i>
                                                <span>Signup with Google</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='tab-pane mt-3' id='login' role='tabpanel'>
                                        <div className='row'>
                                            <div class="mb-2">
                                                <label for="email" class="form-label">Email</label>
                                                <input type="email" class="form-control" id="email"/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div class="mb-2">
                                                <label for="password" class="form-label">Password</label>
                                                <input type="password" class="form-control" id="password"/>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-primary mt-2">Login</button>
                                        <div className='form-separator mt-3'>or</div>
                                        <div class="d-grid mt-3">
                                            <button className="btn btn-primary google-button-container" type="button">
                                                <i className="fa-brands fa-google"></i>
                                                <span>Login with Google</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default LoginSignup;
