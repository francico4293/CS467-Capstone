import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ReactTimeAgo from 'react-time-ago';
import Badge from 'react-bootstrap/Badge';

const JobCard = ({ job, setJobToEdit, setShowEditJobOffCanvas }) => {
    const editJobHandler = () => {
        setJobToEdit(job);
        setShowEditJobOffCanvas(true);
    }

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
                        <Col className='fw-bold fs-5'>
                            {job.company}{job.link ? <i className='fa-solid fa-link ms-1'/> : <></>}
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-muted'>{job.jobTitle}</Col>
                    </Row>
                    <Row>
                        <Col className='text-muted'>{`${job.city}, ${job.state}`}</Col>
                    </Row>
                    <Row>
                        <Col className='overflow-auto d-flex flex-nowrap pt-2 pb-2'>
                            {job.skills.map((skill, idx) => <Badge className='me-1' key={idx}>{skill}</Badge>)}
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex justify-content-between text-muted'>
                            <div>
                                Job created <ReactTimeAgo date={job.created} locale='en-US'/>
                            </div>
                            <div>
                                <i className='fa-solid fa-pen me-2' onClick={editJobHandler}/>
                                <i className='fa-solid fa-trash'/>
                            </div>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default JobCard;
