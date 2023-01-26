import React from 'react';

const SignupFormPane = () => {
    return (
        <div className='tab-pane active' id='signup' role='tabpanel'>
            <div className='row'>
                <div className='col-6'>
                    <div class='mb-2'>
                        <label for='first-name' class='form-label'>First name</label>
                        <input type='text' class='form-control' id='first-name'/>
                    </div>
                </div>
                <div className='col-6'>
                    <div class='mb-2'>
                        <label for='last-name' class='form-label'>Last name</label>
                        <input type='text' class='form-control' id='last-name'/>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div class='mb-2'>
                        <label for='email' class='form-label'>Email</label>
                        <input type='email' class='form-control' id='email'/>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div class="mb-2">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password"/>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div className="mb-2">
                        <label for="confirm-password" class="form-label">Confirm password</label>
                        <input type="password" class="form-control" id="password"/>
                    </div>
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
    );
}

export default SignupFormPane;
