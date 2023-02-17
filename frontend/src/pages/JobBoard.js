import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '../components/Filter';
import JobBoardColumn from '../components/JobBoardColumn';

const JobBoard = () => {
    const [columns, setColumns] = useState(['Interested', 'Applied']);

    const addColumn = () => {
        setColumns([...columns, columns.length + 1]);
    }

    return (
        <Container fluid>
            <Row>
                <Sidebar/>
                <Col xs={10} sm={9} md={10} className='ms-auto'>
                    <Row className='mt-3 mb-3'>
                        <Col className='d-flex border-bottom justify-content-end pb-3'>
                            <Filter name={'Filter by Company'} items={[]} setItems={null}/>
                            <Filter name={'Filter by Skill'} items={[]} setItems={null}/>
                            <Filter name={'Filter by Contact'} items={[]} setItems={null}/>
                        </Col>
                    </Row>
                    <Row className='d-flex flex-nowrap d-inline-block horizontal-scrollable'>
                        {
                            columns.map((column, idx) => <JobBoardColumn column={column} key={idx}/>)
                        }
                        <Col xs={3}>
                            <div className='d-flex justify-content-center align-items-center add-col' onClick={addColumn}>
                                <i className='fa-solid fa-plus fa-2x'/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default JobBoard;
