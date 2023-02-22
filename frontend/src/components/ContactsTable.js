import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

const ContactsTable = ({ contacts, linkedContacts, setContacts, setLinkedContacts }) => {
    const { theme } = useSelector(state => state);
    
    const unlinkContact = (contactToUnlink) => {
        const result = linkedContacts.filter(linkedContact => linkedContact.id !== contactToUnlink.id);
        setLinkedContacts(result);
        setContacts([...contacts, contactToUnlink]);
    }

    return (
        <Table className={`${theme} contacts-table`} striped bordered hover size='sm' variant={`${theme}`}>
            <thead>
                <tr>
                    <th className='text-center text-nowrap p-2'>First Name</th>
                    <th className='text-center text-nowrap p-2'>Last Name</th>
                    <th className='text-center text-nowrap p-2'>Company</th>
                    <th className='text-center text-nowrap p-2'>Job Title</th>
                    <th className='text-center text-nowrap p-2'>Remove</th>
                </tr>
            </thead>
            <tbody>
                {linkedContacts.map((linkedContact, idx) => (
                    <tr key={idx}>
                        <td className='fw-light text-center align-middle'>{linkedContact.firstName}</td>
                        <td className='fw-light text-center align-middle'>{linkedContact.lastName}</td>
                        <td className='fw-light text-center align-middle'>{linkedContact.company}</td>
                        <td className='fw-light text-center align-middle'>{linkedContact.jobTitle}</td>
                        <td className='text-center align-middle'>
                            <i className='fa-solid fa-trash' onClick={() => unlinkContact(linkedContact)}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ContactsTable;
