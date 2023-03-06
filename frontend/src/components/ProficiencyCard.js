import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { deleteSkill } from '../services/skills';
import { getUser } from '../services/users';
import { useSelector, useDispatch } from 'react-redux';

const ProficiencyCard = ({ skill, setSkillToEdit, setShowEditSkillModal }) => {
    const { theme, user } = useSelector(state => state); 
    const dispatch = useDispatch();

    const setError = (e) => {
        alert(e)
    }

    const deleteHandler = async () => {
        await deleteSkill(user.auth, skill.id, setError)

        const data = await getUser(user.auth, setError);
        dispatch({ type: 'SET_USER', payload: {data, auth: user.auth} });

    }

    const handleClick = () => {
        setSkillToEdit(skill);
        setShowEditSkillModal(true);
    }

    return (
        <Card className='proficiency-card'>
            <Card.Body>
                <Row lg={8}>
                    <Col lg={7}>
                        <Card.Title className='fw-light fs-6'>{skill.name}</Card.Title>
                    </Col>
                    <Col lg={5} className='d-flex justify-content-end'>
                        <i className='fa-solid fa-pen-to-square me-2' onClick={handleClick}/>
                        <i className='fa-solid fa-trash'onClick={deleteHandler}/>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                    <Col lg={8}>
                        <CircularProgressbar value={skill.proficiency} text={`${[skill.proficiency]}%`} />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default ProficiencyCard;
