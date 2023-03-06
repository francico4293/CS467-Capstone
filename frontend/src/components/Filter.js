import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Filter = ({ filterName, defaultItem, items, setItem }) => {
    const [selected, setSelected] = useState(null);

    const clickHandler = (item) => {
        setSelected(item);
        setItem(item);
    }

    return (
        <Dropdown className='ms-2'>
            <Dropdown.Toggle variant='secondary' id="dropdown-basic">
                {filterName}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    items.map((item, idx) => (
                        <Dropdown.Item className={selected === item && 'fw-bolder'} key={idx} onClick={() => clickHandler(item)}>
                            {item}{item === selected && <i className='fa-solid fa-filter ms-1'/>}
                        </Dropdown.Item>
                    ))
                }
                <Dropdown.Divider/>
                <Dropdown.Item onClick={() => clickHandler(null)}>{defaultItem}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Filter;
