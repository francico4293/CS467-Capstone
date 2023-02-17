import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '../components/Filter';
import JobBoardColumn from '../components/JobBoardColumn';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const JobBoard = () => {
    const [columns, setColumns] = useState(['Interested', 'Applied']);

    const addColumn = () => {
        setColumns([...columns, (columns.length + 1).toString()]);
    }

    const onDragEndHandler = (result) => {
        const { destination, source, draggableId } = result;

        if (!result.destination) {
            return;
        }

        const newColumns = Array.from(columns);
        const [sourceColumn] = newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, sourceColumn);
        setColumns(newColumns);
    }

    return (
        <Container fluid>
            <Row>
                <Sidebar/>
                <DragDropContext onDragEnd={onDragEndHandler}>
                    <Col xs={10} sm={9} md={10} className='ms-auto'>
                        <Row className='mt-3 mb-3'>
                            <Col className='d-flex border-bottom justify-content-end pb-3'>
                                <Filter filterName={'Filter by Company'} defaultItem={'All companies'} items={[]} setItems={null}/>
                                <Filter filterName={'Filter by Skill'} defaultItem={'All skills'} items={[]} setItems={null}/>
                                <Filter filterName={'Filter by Contact'} defaultItem={'All contacts'} items={[]} setItems={null}/>
                            </Col>
                        </Row>
                        <Droppable droppableId='job-columns' direction='horizontal'>
                            {provided => (
                                <Row className='d-flex flex-nowrap d-inline-block horizontal-scrollable' {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        columns.map((column, idx) => {
                                            return (
                                                <Draggable key={column} draggableId={column} index={idx}>
                                                    {provided => (
                                                        <div className='col' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <JobBoardColumn column={column}/>
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
