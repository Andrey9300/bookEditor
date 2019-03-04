import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { Link } from 'react-router-dom';
import FilterTitle from '../filters/FilterTitle';
import FilterPublish from '../filters/FilterPublish';

const Books = ({ books }) => {
    if (books) {
        return (
            <>
                <div className="alert alert-info" role="alert">
                    <Link to='/book/add'>Добавить книгу</Link>
                </div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">
                            Заголовок
                            <FilterTitle/>
                        </th>
                        <th scope="col">Авторы</th>
                        <th scope="col">Количество страниц</th>
                        <th scope="col">Название издательства</th>
                        <th scope="col">
                            Год публикации
                            <FilterPublish/>
                        </th>
                        <th scope="col">Дата выхода в тираж</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Изображение</th>
                        <th scope="col">Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map(book => (
                        <Book key={book.id} {...book}/>
                    ))}
                    </tbody>
                </table>
            </>
        )
    } else {
        return (
            <div className="alert alert-info" role="alert">
                Еще не было добавлено ни одной книги. <Link to='/book/add'>Добавить книгу</Link>.
            </div>
        );
    }
};

Books.propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        pageCount: PropTypes.string.isRequired,
        publisher: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        yearPublish: PropTypes.string,
        dateEdition: PropTypes.string,
        isbn: PropTypes.string,
        image: PropTypes.string,
    }).isRequired),
    authors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired
    }).isRequired)
};

export default Books;