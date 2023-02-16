import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { signUpUser } from '../services/users';
import validator from 'validator';

const SignupForm = ({ setSignupError, setSignupErrorMessage }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailClicked, setEmailClicked] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordClicked, setPasswordClicked] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordClicked, setConfirmPasswordClicked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setSignupError(true);
            setSignupErrorMessage('Signup failed - passwords must match!');
        } else {
            await signUpUser(email, password, firstName, lastName, setSignupError, setSignupErrorMessage);
        }
    }

    return (
        <Form className='mt-3' onSubmit={handleSignIn}>
            <Row className='mb-2'>
                <Form.Group as={Col}>
                    <Form.Label>First name</Form.Label>
                    <Form.Control onChange={e => setFirstName(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control onChange={e => setLastName(e.target.value)}/>
                </Form.Group>
            </Row>
            <Form.Group className='mb-2 position-relative'>
                <Form.Label>Email*</Form.Label>
                <Form.Control 
                    type='email' 
                    onChange={e => setEmail(e.target.value)} 
                    isValid={validator.isEmail(email)} 
                    isInvalid={emailClicked && !validator.isEmail(email)} 
                    onBlur={() => setEmailClicked(true)}
                />
                <Form.Control.Feedback type='valid'/>
                <Form.Control.Feedback type='invalid'>Enter an email</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-2'>
                <Form.Label>Password*</Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <i className='fa-solid fa-eye-slash'/> : <i className='fa-solid fa-eye'/>}
                    </InputGroup.Text>
                    <Form.Control 
                        type={showPassword ? 'text' : 'password'} 
                        onChange={e => setPassword(e.target.value)} 
                        isValid={password !== ''} 
                        isInvalid={passwordClicked && password === ''}
                        onBlur={() => setPasswordClicked(true)}
                    />
                    <Form.Control.Feedback type='valid'/>
                    <Form.Control.Feedback type='invalid'>Enter a password</Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Confirm password*</Form.Label>
                <InputGroup>
                    <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <i className='fa-solid fa-eye-slash'/> : <i className='fa-solid fa-eye'/>}
                    </InputGroup.Text>
                    <Form.Control 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        onChange={e => setConfirmPassword(e.target.value)} 
                        isValid={confirmPassword !== '' && confirmPassword === password} 
                        isInvalid={confirmPasswordClicked && (confirmPassword === ''|| confirmPassword !== password)}
                        onBlur={() => setConfirmPasswordClicked(true)}
                    />
                    <Form.Control.Feedback type='valid'/>
                    <Form.Control.Feedback type='invalid'>Passwords must match</Form.Control.Feedback>
                </InputGroup>                
            </Form.Group>
            <Button variant='primary' type='submit'>
                Signup
            </Button>
            <div className='d-flex justify-content-center align-items-center text-muted form-separator mt-3'>or</div>
            <div className='d-grid mt-3'>
                <Button className='google-button-container'>
                    <i className='fa-brands fa-google'/>
                    <span>Signup with Google</span>
                </Button>
            </div>
        </Form>
    );
}

export default SignupForm;
