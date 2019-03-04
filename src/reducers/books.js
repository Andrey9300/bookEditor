const books = (state = null, action) => {
    switch (action.type) {
        case 'ADD_BOOK':
            return {
                ...state,
                books: state ? state.books.concat(action.book) : [action.book]
            };
        case 'EDIT_BOOK':
            return {
                ...state,
                books: state.books.map((book) => {
                    if (book.id === action.book.id) {
                        book = action.book;
                    }

                    return book;
                })
            };
        default:
            return state
    }
};

export const getBook = (state, id) => (
    state.books.find((book) => {
        if (book.id === Number(id)) {
            return book;
        }
    })
);

export default books;