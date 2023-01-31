import React, { useState } from 'react';
import { signInUser } from '../services/users';

const LoginFormPane = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const setError = (e) => {
        alert("Login failed!");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        signInUser(email, password, setError);
    }

    return (
        <form className='tab-pane active' id='login' role='tabpanel' onSubmit={submitHandler}>
            <div className='row'>
                <div className='col-12'>
                    <div className="mb-2">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" onChange={({ target }) =>
                            setEmail(target.value)}/>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div className="mb-2">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={({ target }) =>
                            setPassword(target.value)}/>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Login</button>
            <div className='form-separator mt-3'>or</div>
            <div className="d-grid mt-3">
                <button className="btn btn-primary google-button-container" type="button">
                    <i className="fa-brands fa-google"></i>
                    <span>Login with Google</span>
                </button>
            </div>
        </form>
    );
}

export default LoginFormPane;
