import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editBook } from '../../actions/book';
import AuthorsForBook from '../../components/author/AuthorsForBook';
import { getBook } from '../../reducers/books';
import { isValidIsbn, MIN_YEAR_PUBLISH, MIN_DATE_EDITION } from './HelpersBook';

const EditBook = (store) => {
    const book = getBook(store, store.match.params.id);
    let [title, setTitle] = useState(book.title);
    let [authorsId, setAuthorsId] = useState(book.authorsId);
    let [pageCount, setPageCount] = useState(book.pageCount);
    let [publisherId, setPublisherId] = useState(book.publisherId);
    let [yearPublish, setYearPublish] = useState(book.yearPublish);
    let [dateEdition, setDateEdition] = useState(book.dateEdition);
    let [isbn, setIsbn] = useState(book.isbn);
    let [checkIsbn, setCheckIsbn] = useState(0);
    let [image, setImage] = useState(book.image);

    const onSubmit = (e) => {
        e.preventDefault();

        if (isbn && !isValidIsbn(isbn)) {
            setCheckIsbn(1);
            return;
        }

        let bookForSave = {
            id: book.id,
            authorsId,
            publisherId,
            title,
            pageCount,
            yearPublish,
            dateEdition,
            isbn,
            image
        };

        store.dispatch(editBook(bookForSave));

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
        book.authorsId = authorsId;
        store.dispatch(editBook(book));
    };

    const handleRemoveAuthor = (authorIdForRemove) => {
        if (book.authorsId.length <= 1) {
            return;
        }

        book.authorsId = book.authorsId.filter((authorId) => {
            if (authorId !== authorIdForRemove) {
               return authorId;
           }
        });

        store.dispatch(editBook(book));
        setAuthorsId(book.authorsId);
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

    const handleIsbn = (e) => {
        if (isValidIsbn(e.target.value)) {
            setCheckIsbn(0);
        } else {
            setCheckIsbn(1);
        }
        setIsbn(e.target.value);
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

        const isRemove = addedAuthors.length > 1;
        if (addedAuthors.length) {
            return (
                <div className="form-group">
                    <AuthorsForBook authors={addedAuthors} isRemove={isRemove} handleRemoveAuthor={handleRemoveAuthor}/>
                </div>
            )
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Заголовок</label>
                <input type="text" className="form-control" value={title} maxLength="30"
                       onChange={e => setTitle(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>Авторы</label>
                {getAddedAuthors()}
                <select className="custom-select custom-select-lg mb-3" onChange={handleAuthors}>
                    <option value="">---</option>
                    {
                        store.authors.authors.map((author) => {
                            if (!book.authorsId.includes(author.id)) {
                                return (<option key={author.id} value={author.id}>{author.name} {author.surname}</option>);
                            }
                        })
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
                        <select className="custom-select custom-select-lg mb-3" defaultValue={book.publisherId}
                                onChange={e => setPublisherId(e.target.value)}>
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
                <input type="number" className="form-control" value={yearPublish} min={MIN_YEAR_PUBLISH}
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
            <button className="btn btn-primary" type="submit">Сохранить</button>
        </form>
    );
};

const mapStateToProps = state => ({
    books: state.books ? state.books.books : [],
    authors: state.authors ? state.authors : [],
    publishers: state.publishers ? state.publishers : []
});

export default connect(
    mapStateToProps
)(EditBook)