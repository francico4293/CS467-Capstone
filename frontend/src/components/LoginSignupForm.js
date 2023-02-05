import React from 'react';
import SignupFormPane from './SignupFormPane';
import LoginFormPane from './LoginFormPane';

const LoginSignupForm = ({ setShowPasswordResetModal }) => {
    return (
        <div className='tab-content mt-3'>
            <LoginFormPane setShowPasswordResetModal={setShowPasswordResetModal}/>
            <SignupFormPane/>
        </div>
    );
}

export default LoginSignupForm;
