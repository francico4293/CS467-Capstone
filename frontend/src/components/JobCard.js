import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ReactTimeAgo from 'react-time-ago';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import { deleteJob } from '../services/jobs';
import { getUser } from '../services/users';

const JobCard = ({ job, isDragging, setJobToEdit, setShowEditJobOffCanvas }) => {
    const { user, theme }  = useSelector(state => state);
    const dispatch = useDispatch();
    const [showPopover, setShowPopover] = useState(false);

    const setError = (e) => {
        alert(e)
    }

    const deleteHandler = async () => {
        await deleteJob(user.auth, job.id, setError)

        const data = await getUser(user.auth, setError);
        dispatch({ type: 'SET_USER', payload: {data, auth: user.auth} });
        setShowPopover(false);
    }

    const editJobHandler = () => {
        setJobToEdit(job);
        setShowEditJobOffCanvas(true);
    }

    useEffect(() => {
        setShowPopover(false);
    }, [isDragging]);

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
                                <OverlayTrigger
                                    trigger='click'
                                    placement='top'
                                    show={showPopover}
                                    overlay={
                                        <Popover id={theme}>
                                        <Popover.Header as="h3">Delete Job</Popover.Header>
                                        <Popover.Body>
                                            <Row>
                                                <Col className='pb-3'>
                                                    Are you sure you want to delete this job?
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className='d-flex justify-content-end border-top pt-1'>
                                                    <Button className='me-1' onClick={() => setShowPopover(false)}>Cancel</Button>
                                                    <Button onClick={deleteHandler}>Confirm</Button>
                                                </Col>
                                            </Row>
                                        </Popover.Body>
                                    </Popover>
                                }>
                                    <i className='fa-solid fa-trash' onClick={() => setShowPopover(true)}/>
                                </OverlayTrigger>
                            </div>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default JobCard;
