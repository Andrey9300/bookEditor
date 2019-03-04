import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/book';
import { Link } from 'react-router-dom';
import AuthorsForBook from '../../components/author/AuthorsForBook';
import { isValidIsbn, MIN_YEAR_PUBLISH, MIN_DATE_EDITION } from './HelpersBook';

const AddBook = (store) => {
    let [title, setTitle] = useState('');
    let [authorsId, setAuthorsId] = useState([]);
    let [pageCount, setPageCount] = useState('');
    let [publisherId, setPublisherId] = useState('');
    let [yearPublish, setYearPublish] = useState('');
    let [dateEdition, setDateEdition] = useState('');
    let [isbn, setIsbn] = useState('');
    let [checkIsbn, setCheckIsbn] = useState('');
    let [image, setImage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (isbn && !isValidIsbn(isbn)) {
            setCheckIsbn(1);
            return;
        } else {
            setCheckIsbn(0);
        }

        const randomId = Math.floor(Date.now() * Math.random());
        let book = {
            id: randomId,
            authorsId,
            publisherId,
            title,
            pageCount,
            yearPublish,
            dateEdition,
            isbn,
            image
        };

        store.dispatch(addBook(book));

        store.history.push('/book/all/');
    };

    const handleAuthors = (e) => {
        e.preventDefault();

        if (!e.target.value) {
            authorsId = [];
        } else if (!authorsId.includes(Number(e.target.value))) {
            authorsId = authorsId.concat(Number(e.target.value));
        }

        setAuthorsId(authorsId);
    };

    const handleIsbn = (e) => {
        if (!isbn || isValidIsbn(e.target.value)) {
            setCheckIsbn(0);
        } else {
            setCheckIsbn(1);
        }
        setIsbn(e.target.value);
    };

    const handleRemoveAuthor = (authorIdForRemove) => {
        authorsId = authorsId.filter((authorId) => {
            if (authorId !== authorIdForRemove) {
                return authorId;
            }
        });

        setAuthorsId(authorsId);
    };

    const handleImage = (e) => {
        const files = Array.from(e.target.files);

        if (files && files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setImage(e.target.result)
            };

            reader.readAsDataURL(files[0]);
        }
    };

    const getAddedAuthors = () => {
        if (!authorsId) {
            return;
        }

        const addedAuthors = [];

        store.authors.authors.map((author) => {
            if (authorsId.includes(author.id)) {
                addedAuthors.push(author);
            }
        });

        const isRemove = authorsId.length > 1;
        if (addedAuthors.length) {
            return (
                <div className="form-group">
                    <AuthorsForBook authors={addedAuthors} isRemove={isRemove} handleRemoveAuthor={handleRemoveAuthor}/>
                </div>
            )
        }
    };

    if (!store.authors.authors) {
        return (
            <div className="alert alert-danger" role="alert">
                Чтобы добавить книгу нужен минимум один автор. <Link to='/author/add'>Добавить автора</Link>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit}>
            {!store.publishers.publishers &&
                (
                    <div className="alert alert-info" role="alert">
                        У вас нет добавленных издателей. <Link to='/publisher/add'>Добавить сейчас </Link>
                        или можете сделать это после создания книги.
                    </div>
                )
            }
            <div className="form-group">
                <label>Заголовок</label>
                <input type="text" className="form-control" value={title} maxLength="30"
                       onChange={e => setTitle(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>Авторы</label>
                {!authorsId.length && <small className="form-text text-muted">Нужно выбрать минимум одного автора</small>}
                {getAddedAuthors()}
                <select className="custom-select custom-select-lg mb-3" onChange={handleAuthors} required>
                    <option value="">---</option>
                    {
                        store.authors.authors.map((author) => (
                            <option key={author.id} value={author.id}>{author.name} {author.surname}</option>
                        ))
                    }
                </select>
            </div>
            <div className="form-group">
                <label>Количество страниц</label>
                <input type="number" className="form-control" value={pageCount} min="0" max="10000"
                       onChange={e => setPageCount(e.target.value)} required/>
            </div>
            {store.publishers.publishers &&
                (
                    <div className="form-group">
                        <label>Название издательства</label>
                        <select className="custom-select custom-select-lg mb-3" onChange={e => setPublisherId(e.target.value)}>
                            <option value="">Выберите издателя</option>
                            {
                                store.publishers.publishers.map((publisher) => (
                                    <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
                                ))
                            }
                        </select>
                    </div>
                )
            }
            <div className="form-group">
                <label>Год публикации</label>
                <input type="number" className="form-control" value={yearPublish} maxLength="30" min={MIN_YEAR_PUBLISH}
                       onChange={e => setYearPublish(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Дата выхода в тираж</label>
                <input type="date" className="form-control" value={dateEdition} min={MIN_DATE_EDITION}
                       onChange={e => setDateEdition(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>ISBN</label>
                <input type="text" className="form-control" value={isbn} onChange={e => handleIsbn(e)}/>
                {checkIsbn === 1 &&
                    <div className="alert alert-danger" role="alert">
                        Не правильный номер isbn
                    </div>
                }
            </div>
            <div className="form-group">
                {image && <img src={image} width="50px" height="50px" alt="изображение книги"/>}
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile" onChange={e => handleImage(e)}/>
                    <label className="custom-file-label" htmlFor="customFile">Выберите изображение</label>
                </div>
            </div>
            <button className="btn btn-primary" type="submit">Добавить книгу</button>
        </form>
    );
};

const mapStateToProps = state => ({
    authors: state.authors ? state.authors : [],
    publishers: state.publishers ? state.publishers : []
});

export default connect(
    mapStateToProps
)(AddBook)