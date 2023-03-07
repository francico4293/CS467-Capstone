import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const ContactsFilter = ({ contacts, setContactFilter }) => {
    const [selected, setSelected] = useState(null);

    const clickHandler = (contactId) => {
        setSelected(contactId);
        setContactFilter(contactId);
    }

    return (
        <Dropdown className='ms-2'>
            <Dropdown.Toggle variant='secondary'>
                Filter by Contact
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    contacts.map((contact, idx) => (
                        <Dropdown.Item className={selected === contact.id && 'fw-bolder'} key={idx} onClick={() => clickHandler(contact.id)}>
                            {`${contact.firstName} ${contact.lastName} - ${contact.company}`}{contact.id === selected && <i className='fa-solid fa-filter ms-1'/>}
                        </Dropdown.Item>
                    ))
                }
                <Dropdown.Divider/>
                <Dropdown.Item className={selected === null && 'fw-bolder'} onClick={() => clickHandler(null)}>
                    All contacts{selected === null && <i className='fa-solid fa-filter ms-1'/>}
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ContactsFilter;
