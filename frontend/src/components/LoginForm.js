import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { signInUser, signInWithGoogle } from '../services/users';
import validator from 'validator';

const LoginForm = ({ setLoginError, setShowPasswordResetModal }) => {
    const [email, setEmail] = useState('');
    const [emailClicked, setEmailClicked] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordClicked, setPasswordClicked] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const handleLogIn = (e) => {
        e.preventDefault();

        if (!validator.isEmail(email) || password === '') {
            !validator.isEmail(email) && setEmailClicked(true);
            password === '' && setPasswordClicked(true);
            setLoginError(true);
            return;
        }

        signInUser(email, password, setLoginError);
    }

    return (
        <Form className='mt-3' onSubmit={handleLogIn}>
            <Form.Group className='mb-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    isInvalid={emailClicked && !validator.isEmail(email)}
                    onBlur={() => setEmailClicked(true)}
                    isValid={validator.isEmail(email)}
                />
                <Form.Control.Feedback type='valid'/>
                <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-2'>
                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <i className='fa-solid fa-eye-slash'/> : <i className='fa-solid fa-eye'/>}
                    </InputGroup.Text>
                    <Form.Control 
                        type={showPassword ? 'text' : 'password'} 
                        onChange={e => setPassword(e.target.value)}
                        isInvalid={passwordClicked && (password === '' || invalidPassword)}
                        onBlur={() => setPasswordClicked(true)}
                        onClick={() => setInvalidPassword(false)}
                    />
                    <Form.Control.Feedback type='invalid'>Please enter your password</Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <a className='d-block mb-3 reset-password' onClick={() => setShowPasswordResetModal(true)}>Forgot password?</a>
            <Button variant='primary' type='submit'>
                Login
            </Button>
            <div className='d-flex justify-content-center align-items-center text-muted form-separator mt-3'>or</div>
            <div className='d-grid mt-3'>
                <Button className='google-button-container' onClick={() => signInWithGoogle(setLoginError)}>
                    <i className='fa-brands fa-google'/>
                    <span>Login with Google</span>
                </Button>
            </div>
        </Form>
    );
}

export default LoginForm;
