import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Filter = ({ name, items, setItem }) => {
    return (
        <Dropdown className='ms-2'>
            <Dropdown.Toggle variant='secondary' id="dropdown-basic">
                {name}
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
