import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Filter = ({ items }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant='secondary' id="dropdown-basic">
                Filter by Company
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    items.map((item, idx) => <Dropdown.Item key={idx}>{item}</Dropdown.Item>)
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Filter;
