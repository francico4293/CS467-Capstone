import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/card';
import JobCard from './JobCard';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { editColumn, deleteColumn } from '../services/columns';
import { getUser } from '../services/users';

const JobBoardColumn = ({ column, companyFilter, skillFilter, contactFilter, isDragging, setJobToEdit, setShowAddJobOffCanvas, setShowEditJobOffCanvas, setSelectedJobColumn, ...props }) => {
    const [showPopover, setShowPopover] = useState(false);
    const [editColumnName, setEditColumnName] = useState(false);
    const [columnName, setColumnName] = useState(column.name.toUpperCase());
    const { user, theme } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleAddJob = () => {
        setSelectedJobColumn(column.id);
        setShowAddJobOffCanvas(true);
    }

    const setError = (e) => {
        alert(e)
    }

    const deleteHandler = async () => {
        await deleteColumn(user.auth, column.id, setError)
        const data = await getUser(user.auth, setError);
        dispatch({ type: 'SET_USER', payload: { data, auth: user.auth } });
        setShowPopover(false);
    }


    const editHandler = async () => {
        if (columnName !== column.name){
            await editColumn(user.auth, column.id, {name: columnName}, setError)
            const data = await getUser(user.auth, setError);
            dispatch({ type: 'SET_USER', payload: { data, auth: user.auth } });
        } else {
            setEditColumnName(false)
        }
    }

    useEffect(() => {
        setShowPopover(false);
    }, [isDragging]);

    useEffect(() => {
        setEditColumnName(false)
    }, [column]);

    return (
        <div className='test'>
            <h3 className='d-flex justify-content-between fw-light fs-5 p-3 col-name' {...props}>
                {
                    editColumnName 
                        ? <Form.Control 
                            size='sm' 
                            className='me-5' 
                            autoFocus='true' 
                            value={columnName.toUpperCase()}
                            onChange={e => setColumnName(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && editHandler()}
                        /> 
                        : column.name.toUpperCase()
                }
                <div>
                    {
                        editColumnName 
                            ? <i className='fa-solid fa-circle-check me-2' onClick={() => setEditColumnName(false)}/> 
                            : <i className='fa-solid fa-pen me-2' onClick={() => setEditColumnName(true)}/>
                    }
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
            <Droppable droppableId={column.id} direction='vertical'>
                {(provided, snapshot) => (
                    <div className='drop-zone' {...provided.droppableProps} ref={provided.innerRef}>
                        {
                            column.jobs.filter(job => companyFilter === null || job.company === companyFilter)
                                .filter(job => skillFilter === null || job.skills.includes(skillFilter))
                                .filter(job => contactFilter === null || job.contacts.includes(contactFilter))
                                .map((job, idx) => {
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
