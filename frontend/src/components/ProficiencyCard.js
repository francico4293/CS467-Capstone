import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const ProficiencyCard = ({ skillName, proficiency, setSkillToEdit, setShowEditSkillModal }) => {
    const handleClick = () => {
        setSkillToEdit({ skillName, proficiency });
        setShowEditSkillModal(true);
    }

    return (
        <Card className='proficiency-card'>
            <Card.Body>
                <Row lg={8}>
                    <Col lg={7}>
                        <Card.Title className='fw-light fs-6'>{skillName}</Card.Title>
                    </Col>
                    <Col lg={5} className='d-flex justify-content-end'>
                        <i className='fa-solid fa-pen-to-square me-2' onClick={handleClick}/>
                        <i className='fa-solid fa-trash'/>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                    <Col lg={8}>
                        <CircularProgressbar value={proficiency} text={`${[proficiency]}%`} />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default ProficiencyCard;
