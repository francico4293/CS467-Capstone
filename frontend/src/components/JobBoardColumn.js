import React from 'react';
import Col from 'react-bootstrap/Col';

const JobBoardColumn = ({ column }) => {
    return (
        <Col xs={3}>
            <div className='test'>
                <h3 className='fw-light fs-5 p-3 col-name'>{column}</h3>
            </div>
        </Col>
    );
}

export default JobBoardColumn;
