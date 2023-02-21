import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const JobCard = ({ job }) => {
    return (
        <Card className='job-card m-2'>
            <div className='job-card-color' style={{ backgroundColor: `${job.color}` }}></div>
            <Card.Body>
                <Card.Text className='text-wrap'>
                    <Image 
                        className='company-logo'
                        src={job.companyLogo} 
                        width={'10%'}
                        fluid
                    />
                    <Row>
                        <Col className='fw-bold fs-5'>{job.company}<i className='fa-solid fa-link ms-1'/></Col>
                    </Row>
                    <Row>
                        <Col className='text-muted'>{job.jobTitle}</Col>
                    </Row>
                    <Row>
                        <Col className='text-muted'>{`${job.city}, ${job.state}`}</Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default JobCard;
