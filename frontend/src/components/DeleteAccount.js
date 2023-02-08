import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { deleteUserAccount } from '../services/users';

const DeleteAccount = () => {
    const { user } = useSelector(state => state);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleAccountDeletion = async () => {
        try {
            await deleteUserAccount(user, password);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Row className='mt-3'>
                <Col>
                    Warning: Your account will be permanently deleted and will not be recoverable.
                </Col>
            </Row>
            <Row className='mt-2 mb-3'>
                <Col>
                    Enter your password to confirm.
                </Col>
            </Row>
            <Row className='mt-2 mb-2'>
                <Form.Group className='mb-2' as={Col}>
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}/>
                        <InputGroup.Text value={password} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <i className='fa-solid fa-eye-slash'/> : <i className='fa-solid fa-eye'/>}
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Modal.Footer className='justify-content-center'>
                <Button variant="danger" onClick={handleAccountDeletion}>
                    Permanently Delete Account
                </Button>
            </Modal.Footer>
        </>
    );
}

export default DeleteAccount;
