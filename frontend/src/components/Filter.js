import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Filter = ({ items, setItem }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant='secondary' id="dropdown-basic">
                Filter by Company
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    items.map((item, idx) => <Dropdown.Item key={idx} onClick={() => setItem(item)}>{item}</Dropdown.Item>)
                }
                <Dropdown.Divider/>
                <Dropdown.Item onClick={() => setItem(null)}>All companies</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Filter;
