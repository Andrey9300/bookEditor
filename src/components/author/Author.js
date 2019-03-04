import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Author = (author) => (
    <tr>
        <td>{author.name}</td>
        <td>{author.surname}</td>
        <td>
            <Link to={{pathname: `/author/edit/${author.id}`}}>Редактировать</Link>
        </td>
    </tr>
);

Author.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired
};

export default Author;