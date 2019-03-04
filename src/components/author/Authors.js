import React from 'react';
import PropTypes from 'prop-types';
import Author from './Author';
import { Link } from 'react-router-dom';

const Authors = (authors) => {
    if (authors.authors.length) {
        return (
            <>
                <div className="alert alert-info" role="alert">
                    <Link to='/author/add'>Добавить автора</Link>
                </div>
                <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Действие</th>
                </tr>
                </thead>
                <tbody>
                    {authors.authors.map(author => (
                        <Author key={author.id} {...author}/>
                    ))}
                </tbody>
                </table>
            </>
        );
    } else {
        return (
            <div className="alert alert-info" role="alert">
                Еще не было добавлено ни одного автора. <Link to='/author/add'>Добавить автора</Link>.
            </div>
        )
    }
};

Authors.propTypes = {
    author: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired
    }).isRequired)
};

export default Authors;