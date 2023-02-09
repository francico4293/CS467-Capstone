import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Pages = ({ numberOfContacts, activePage, setActivePage }) => {
    const items = [];
    const numberOfPages = numberOfContacts / 9;

    for (let page = 0; page < numberOfPages; page++) {
        items.push(
            <Pagination.Item key={page} active={page === activePage} onClick={() => setActivePage(page)}>
                {page + 1}
            </Pagination.Item>
        )
    }

    return (
        <Pagination>{items}</Pagination>
    );
}

export default Pages;
