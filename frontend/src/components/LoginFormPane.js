import React from 'react';

const LoginFormPane = () => {
    return (
        <div className='tab-pane mt-3' id='login' role='tabpanel'>
            <div className='row'>
                <div className='col-12'>
                    <div class="mb-2">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email"/>
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
            <button type="submit" class="btn btn-primary mt-2">Login</button>
            <div className='form-separator mt-3'>or</div>
            <div class="d-grid mt-3">
                <button className="btn btn-primary google-button-container" type="button">
                    <i className="fa-brands fa-google"></i>
                    <span>Login with Google</span>
                </button>
            </div>
        </div>
    );
}

export default LoginFormPane;
