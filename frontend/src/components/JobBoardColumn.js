import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/card';
import JobCard from './JobCard';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const JobBoardColumn = ({ column, isDragging, setJobToEdit, setShowAddJobOffCanvas, setShowEditJobOffCanvas, setSelectedJobColumn, ...props }) => {
    const [showPopover, setShowPopover] = useState(false);
    const { theme } = useSelector(state => state);

    const handleAddJob = () => {
        setSelectedJobColumn(column.name);
        setShowAddJobOffCanvas(true);
    }

    const deleteHandler = () => {
        setShowPopover(false);
    }

    useEffect(() => {
        setShowPopover(false);
    }, [isDragging]);

    return (
        <div className='test'>
            <h3 className='d-flex justify-content-between fw-light fs-5 p-3 col-name' {...props}>
                {column.name.toUpperCase()}
                <div>
                    <i className='fa-solid fa-pen me-2'/>
                    <OverlayTrigger
                        trigger='click'
                        placement='right'
                        show={showPopover}
                        overlay={
                            <Popover id={theme}>
                            <Popover.Header as="h3">Delete Job Column</Popover.Header>
                            <Popover.Body>
                                <Row>
                                    <Col className='pb-3'>
                                        Are you sure you want to delete this job column?
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
            </h3>
            <Card className='add-job m-2' onClick={handleAddJob}>
                <Card.Body className='d-flex justify-content-center'>
                    <i className='fa-solid fa-plus fa-2x'/>
                </Card.Body>
            </Card>
            <Droppable droppableId={column.name} direction='vertical'>
                {(provided, snapshot) => (
                    <div className='drop-zone' {...provided.droppableProps} ref={provided.innerRef}>
                        {
                            column.jobs.map((job, idx) => {
                                return (
                                    <Draggable key={job.id} draggableId={job.id} index={idx}>
                                        {provided => (
                                            <div className='d-flex flex-column' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <JobCard job={job} isDragging={snapshot.isDraggingOver} setJobToEdit={setJobToEdit} setShowEditJobOffCanvas={setShowEditJobOffCanvas}/>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default JobBoardColumn;
