import { connect } from 'react-redux';
import { SortingFilters } from '../../actions/book';
import Books from '../../components/book/Books';

const filterBooks = (books, filter) => {
    let booksForSort = [...books.books];

    switch (filter) {
        case SortingFilters.ALPHABETICALLY:
            booksForSort = sortTitleAlphabetically(booksForSort);
            break;
        case SortingFilters.REVERSE_ALPHABETICALLY:
            booksForSort = sortTitleReverseAlphabetically(booksForSort);
            break;
        case SortingFilters.YEAR_PUBLISH:
            booksForSort = sortYearPublish(booksForSort);
            break;
        case SortingFilters.REVERSE_YEAR_PUBLISH:
            booksForSort = sortReverseYearPublish(booksForSort);
            break;
        default:
            throw new Error(`Unknown sort: ${filter}`);
    }

    return booksForSort;
};

const sortTitleAlphabetically = (books) => {
    const booksForSort = [...books];

    booksForSort.sort((a, b) => {
        if (a.title > b.title) {
            return -1;
        }
        if (a.title < b.title) {
            return 1;
        }
        return 0;
    });

    return booksForSort;
};

const sortTitleReverseAlphabetically = (books) => {
    const booksForSort = [...books];

    booksForSort.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });

    return booksForSort;
};

const sortYearPublish = (books) => {
    const booksForSort = [...books];

    booksForSort.sort((a, b) => {
        return Number(a.yearPublish) - Number(b.yearPublish);
    });

    return booksForSort;
};

const sortReverseYearPublish = (books) => {
    const booksForSort = [...books];

    booksForSort.sort((a, b) => {
        return Number(b.yearPublish) - Number(a.yearPublish);
    });

    return booksForSort;
};

const getBooks = (books, authors, publishers, filter) => {
    if (!books) {
        return null;
    }

    books.books = books.books.map((item) => {
        item.authors = [];

        item.authorsId.forEach((id) => {
            const author = authors.authors.find((author) => {
                if (author.id === Number(id)) {
                    return author;
                }
            });

            item.authors = item.authors.concat(author);
        });

        if (item.publisherId) {
            item.publisher = publishers.publishers.find((publisher) => {
                if (publisher.id === Number(item.publisherId)) {
                    return publisher;
                }
            });
        }

        return item;
    });

    books.books = filterBooks(books, filter);

    return books.books;
};

const mapStateToProps = state => ({
    books: getBooks(state.books, state.authors, state.publishers, state.sortingFilters.filter),
});

export default connect(
    mapStateToProps
)(Books)