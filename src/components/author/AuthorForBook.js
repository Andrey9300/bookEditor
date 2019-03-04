import React from 'react';
import PropTypes from 'prop-types';

const AuthorForBook = (author) => {
    return (
        <li className="list-group-item list-group-item-light">{author.name} {author.surname}&nbsp;
            {author.isRemove &&
                (<span className="badge badge-danger" onClick={() => {author.handleRemoveAuthor(author.id)}}>
                    Удалить
                </span>)
            }
        </li>
    )
};

AuthorForBook.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    isRemove: PropTypes.bool,
    handleRemoveAuthor: PropTypes.func
};

export default AuthorForBook;