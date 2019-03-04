import React from 'react';
import PropTypes from 'prop-types';
import AuthorsForBook from "../author/AuthorsForBook";
import PublisherForBook from '../publisher/PublisherForBook';
import { Link } from 'react-router-dom';

const Book = (book) => {
    return (
        <tr>
            <td>{book.title}</td>
            <td><AuthorsForBook authors={book.authors}/></td>
            <td>{book.pageCount}</td>
            <td>{book.publisher && <PublisherForBook name={book.publisher.name}/>}</td>
            <td>{book.yearPublish}</td>
            <td>{book.dateEdition}</td>
            <td>{book.isbn}</td>
            <td>{book.image && <img src={book.image} width="50px" height="50px" alt="изображение книги"/>}</td>
            <td>
                <Link to={{pathname: `/book/edit/${book.id}`}}>Редактировать</Link>
            </td>
        </tr>
    )
};

Book.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired
    }).isRequired).isRequired,
    pageCount: PropTypes.string.isRequired,
    publisher: PropTypes.shape({
        name: PropTypes.string.isRequired
    }),
    yearPublish: PropTypes.string,
    dateEdition: PropTypes.string,
    isbn: PropTypes.string,
    image: PropTypes.string
};

export default Book;