import React from 'react';
import Table from 'react-bootstrap/Table';

const ContactsTable = ({ contacts }) => {
    return (
        <Table striped bordered hover size='sm'>
            <thead>
                <tr>
                    <th className='fw-normal text-center text-nowrap p-2'>First Name</th>
                    <th className='fw-normal text-center text-nowrap p-2'>Last Name</th>
                    <th className='fw-normal text-center text-nowrap p-2'>Company</th>
                    <th className='fw-normal text-center text-nowrap p-2'>Job Title</th>
                    <th className='fw-normal text-center text-nowrap p-2'>Remove</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, idx) => (
                    <tr key={idx}>
                        <td className='fw-light text-center align-middle'>{contact.firstName}</td>
                        <td className='fw-light text-center align-middle'>{contact.lastName}</td>
                        <td className='fw-light text-center align-middle'>{contact.company}</td>
                        <td className='fw-light text-center align-middle'>{contact.jobTitle}</td>
                        <td className='text-center align-middle'><i className='fa-solid fa-trash'/></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ContactsTable;
