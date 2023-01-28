import React from 'react';
import SignupFormPane from './SignupFormPane';
import LoginFormPane from './LoginFormPane';

const LoginSignupForm = () => {
    return (
        <div className='tab-content mt-3'>
            <form className='tab-pane active' id='login' role='tabpanel'>
                <LoginFormPane />
            </form>
            <form className='tab-pane mt-3' id='signup' role='tabpanel'>
                <SignupFormPane />
            </form>
        </div>
    );
}

export default LoginSignupForm;
