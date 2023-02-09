import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Pages = () => {
    const items = [];

    for (let page = 1; page <= 2; page++) {
        items.push(
            <Pagination.Item key={page} active={page === 2}>
                {page}
            </Pagination.Item>
        )
    }

    return (
        <Pagination>{items}</Pagination>
    );
}

export default Pages;
