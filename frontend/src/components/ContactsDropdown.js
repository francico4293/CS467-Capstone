import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const ContactsDropdown = ({ contacts, linkedContacts, setContacts, setLinkedContacts }) => {
    const handleLinkContact = (contactToLink) => {
        const result = contacts.filter(contact => contact.id !== contactToLink.id);
        setLinkedContacts([...linkedContacts, contactToLink]);
        setContacts(result);
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant='secondary' size='sm'>
                Link a Contact
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    contacts.length === 0
                        ? <Dropdown.Item>No linkable contacts</Dropdown.Item>
                        : (
                            contacts.map((contact, idx) => (
                                <Dropdown.Item key={idx} onClick={() => handleLinkContact(contact)}>{`${contact.firstName} ${contact.lastName}`}</Dropdown.Item>
                            ))
                        )
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ContactsDropdown;
