import React from 'react';
import Card from 'react-bootstrap/Card';

const JobCard = ({ name }) => {
    return (
        <Card className='m-2'>
            <Card.Body>
                <Card.Title>Company {name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Job Title</Card.Subtitle>
                <Card.Text className='text-wrap'>
                    Job Info
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default JobCard;
