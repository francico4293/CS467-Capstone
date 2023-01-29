import React from 'react';
import SignupFormPane from './SignupFormPane';
import LoginFormPane from './LoginFormPane';

const LoginSignupForm = () => {
    return (
        <div className='tab-content mt-3'>
            <LoginFormPane />
            <SignupFormPane />
        </div>
    );
}

export default LoginSignupForm;
