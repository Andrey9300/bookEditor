import React from 'react';
import PropTypes from 'prop-types';
import AuthorForBook from './AuthorForBook';
import { Link } from 'react-router-dom';

const AuthorsForBook = (authors) => {
    if (authors.authors.length) {
        return (
            <ul className="list-group">
                {authors.authors.map(author => (
                    <AuthorForBook key={author.id}
                                   {...author}
                                   isRemove={authors.isRemove}
                                   handleRemoveAuthor={authors.handleRemoveAuthor}
                    />
                ))}
            </ul>
        );
    } else {
        return (
            <div className="alert alert-info" role="alert">
                Еще не было добавлено ни одного автора. <Link to='/author/add'>Добавить автора</Link>.
            </div>
        )
    }
};

AuthorsForBook.propTypes = {
    author: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired
    }).isRequired)
};

export default AuthorsForBook;