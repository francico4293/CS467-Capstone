import React from 'react';
import Card from 'react-bootstrap/card';
import JobCard from './JobCard';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const JobBoardColumn = ({ column, ...props }) => {
    return (
        <div className='test'>
            <h3 className='d-flex justify-content-between fw-light fs-5 p-3 col-name' {...props}>
                {column.name.toUpperCase()}
                <div>
                    <i className='fa-solid fa-pen me-2'/>
                    <i className='fa-solid fa-trash'/>
                </div>
            </h3>
            <Card className='add-job m-2'>
                <Card.Body className='d-flex justify-content-center'>
                    <i className='fa-solid fa-plus fa-2x'/>
                </Card.Body>
            </Card>
            <Droppable droppableId={column.name} direction='vertical'>
                {provided => (
                    <div className='drop-zone' {...provided.droppableProps} ref={provided.innerRef}>
                        {
                            column.jobs.map((job, idx) => {
                                return (
                                    <Draggable key={job} draggableId={job} index={idx}>
                                        {provided => (
                                            <div className='d-flex flex-column' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <JobCard name={job}/>
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
