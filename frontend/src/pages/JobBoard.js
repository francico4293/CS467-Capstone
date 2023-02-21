import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '../components/Filter';
import JobBoardColumn from '../components/JobBoardColumn';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddJobOffCanvas from '../components/AddJobOffCanvas';

const JobBoard = () => {
    const [showAddJobOffCanvas, setShowAddJobOffCanvas] = useState(false);
    const [userJobData, setUserJobData] = useState(
        {
            columns: [
                {
                    name: 'interested',
                    jobs: ['1', '2']
                },
                {
                    name: 'applied',
                    jobs: ['3']
                },
            ]
        }
    );

    const addColumn = () => {
        setUserJobData({ columns: [...userJobData.columns, { name: `Column ${userJobData.columns.length + 1}`, jobs: [] }] });
    }

    const onDragEndHandler = (result) => {
        const { destination, source, type } = result;

        if (!result.destination) {
            return;
        }

        if (type === 'job-columns') {
            const newColumns = Array.from(userJobData.columns);
            const [sourceColumn] = newColumns.splice(source.index, 1);
            newColumns.splice(destination.index, 0, sourceColumn);
            setUserJobData({ columns: newColumns });
        } else {
            if (source.droppableId === destination.droppableId) {
                const jobs = userJobData.columns.filter(column => column.name === source.droppableId)[0].jobs;
                const [reorderedJob] = jobs.splice(source.index, 1);
                jobs.splice(destination.index, 0, reorderedJob);
            } else {
                const sourceJobs = userJobData.columns.filter(column => column.name === source.droppableId)[0].jobs;
                const destinationJobs = userJobData.columns.filter(column => column.name === destination.droppableId)[0].jobs;
                const [reorderJob] = sourceJobs.splice(source.index, 1);
                destinationJobs.splice(destination.index, 0, reorderJob);
            }
        }
    }

    return (
        <Container fluid>
            <Row>
                <Sidebar/>
                <DragDropContext onDragEnd={onDragEndHandler}>
                    <Col xs={10} sm={9} md={10} className='ms-auto'>
                        <AddJobOffCanvas show={showAddJobOffCanvas} setShow={setShowAddJobOffCanvas}/>
                        <Row className='mt-3 mb-3'>
                            <Col className='d-flex border-bottom justify-content-end pb-3'>
                                <Filter filterName={'Filter by Company'} defaultItem={'All companies'} items={[]} setItems={null}/>
                                <Filter filterName={'Filter by Skill'} defaultItem={'All skills'} items={[]} setItems={null}/>
                                <Filter filterName={'Filter by Contact'} defaultItem={'All contacts'} items={[]} setItems={null}/>
                            </Col>
                        </Row>
                        <Droppable droppableId='job-columns' direction='horizontal' type='job-columns'>
                            {provided => (
                                <Row className='d-flex flex-nowrap d-inline-block horizontal-scrollable pb-5' {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        userJobData.columns.map((column, idx) => {
                                            return (
                                                <Draggable key={column.name} draggableId={column.name} index={idx}>
                                                    {provided => (
                                                        <div className='col' {...provided.draggableProps} ref={provided.innerRef}>
                                                            <JobBoardColumn 
                                                                column={column} 
                                                                setShowAddJobOffCanvas={setShowAddJobOffCanvas} 
                                                                {...provided.dragHandleProps}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })
                                    }
                                    {provided.placeholder}
                                    <Col xs={6}>
                                        <div className='d-flex justify-content-center align-items-center add-col' onClick={addColumn}>
                                            <i className='fa-solid fa-plus fa-2x'/>
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        </Droppable>
                    </Col>
                </DragDropContext>
            </Row>
        </Container>
    );
}

export default JobBoard;
