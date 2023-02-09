import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Pages = ({ activePage, setActivePage }) => {
    const items = [];

    for (let page = 0; page < 2; page++) {
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
