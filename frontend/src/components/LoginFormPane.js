import React, { useState } from 'react';
import { signInUser } from '../services/users';
import { useNavigate } from 'react-router-dom';

const LoginFormPane = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const setError = (e) => {
        alert("Login failed!");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        signInUser(email, password, setError, navigate);
    }

    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <div class="mb-2">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" onChange={({ target }) =>
                            setEmail(target.value)}/>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div class="mb-2">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" onChange={({ target }) =>
                            setPassword(target.value)}/>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary mt-2" onClick={submitHandler}>Login</button>
            <div className='form-separator mt-3'>or</div>
            <div class="d-grid mt-3">
                <button className="btn btn-primary google-button-container" type="button">
                    <i className="fa-brands fa-google"></i>
                    <span>Login with Google</span>
                </button>
            </div>
        </>
    );
}

export default LoginFormPane;
