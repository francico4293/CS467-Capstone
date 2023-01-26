import React from 'react';
import SignupFormPane from './SignupFormPane';
import LoginFormPane from './LoginFormPane';

const LoginSignupForm = () => {
    return (
        <form>
            <div className='tab-content mt-3'>
                <SignupFormPane/>
                <LoginFormPane/>
            </div>
        </form>
    );
}

export default LoginSignupForm;
