import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Filter = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant='secondary' id="dropdown-basic">
                Filter by Company
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href='#/action-1'>Google</Dropdown.Item>
                <Dropdown.Item href='#/action-2'>Meta</Dropdown.Item>
                <Dropdown.Item href='#/action-3'>Palantir</Dropdown.Item>
                <Dropdown.Item href='#/action-3'>Amazon</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Filter;
