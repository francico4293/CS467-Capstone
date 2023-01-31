import React, { useState } from 'react';
import { signUpUser } from '../services/users';

const SignupFormPane = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const setError = (e) => {
        alert("Signup failed!");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        signUpUser(email, password, confirmPassword, firstName, lastName, setError);
    }

    return (
        <form className='tab-pane mt-3' id='signup' role='tabpanel' onSubmit={submitHandler}>
            <div className='row'>
                <div className='col-6'>
                    <div className='mb-2'>
                        <label for='first-name' className='form-label'>First name</label>
                        <input type='text' className='form-control' id='first-name' onChange={({ target }) =>
                            setFirstName(target.value)} />
                    </div>
                </div>
                <div className='col-6'>
                    <div className='mb-2'>
                        <label for='last-name' className='form-label'>Last name</label>
                        <input type='text' className='form-control' id='last-name' onChange={({ target }) =>
                            setLastName(target.value)} />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div className='mb-2'>
                        <label for='email' className='form-label'>Email</label>
                        <input type='email' className='form-control' id='email' onChange={({ target }) =>
                            setEmail(target.value)} />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div className="mb-2">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={({ target }) =>
                            setPassword(target.value)} />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div className="mb-2">
                        <label for="confirm-password" className="form-label">Confirm password</label>
                        <input type="password" className="form-control" id="password" onChange={({ target }) => 
                            setConfirmPassword(target.value)}/>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Signup</button>
            <div className='form-separator mt-3'>or</div>
            <div className="d-grid mt-3">
                <button className="btn btn-primary google-button-container" type="button">
                    <i className="fa-brands fa-google"></i>
                    <span>Signup with Google</span>
                </button>
            </div>
        </form>
    );
}

export default SignupFormPane;
