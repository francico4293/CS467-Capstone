import React from 'react';
import Card from 'react-bootstrap/card';
import JobCard from './JobCard';

const JobBoardColumn = ({ column, ...props }) => {
    return (
        <div className='test'>
            <h3 className='d-flex justify-content-between fw-light fs-5 p-3 col-name' {...props}>
                {column}
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
            <JobCard/>
            <JobCard/>
        </div>
    );
}

export default JobBoardColumn;
