import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { signInUser, signInWithGoogle } from '../services/users';

const LoginForm = ({ setLoginError, setShowPasswordResetModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogIn = (e) => {
        e.preventDefault();
        signInUser(email, password, setLoginError);
    }

    return (
        <Form className='mt-3' onSubmit={handleLogIn}>
            <Form.Group className='mb-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' onChange={e => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-2'>
                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <i className='fa-solid fa-eye-slash'/> : <i className='fa-solid fa-eye'/>}
                    </InputGroup.Text>
                    <Form.Control type={showPassword ? 'text' : 'password'} onChange={e => setPassword(e.target.value)}/>
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
