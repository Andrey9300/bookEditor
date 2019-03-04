const authors = (state = null, action) => {
    switch (action.type) {
        case 'ADD_AUTHOR':
            return {
                ...state,
                authors: state ? state.authors.concat(action.author) : [action.author]
            };
        case 'EDIT_AUTHOR':
            return {
                ...state,
                authors: state.authors.map((author) => {
                    if (author.id === action.author.id) {
                        author = action.author;
                    }

                    return author;
                })
            };
        default:
            return state
    }
};

export const getAuthor = (state, id) => (
    state.authors.find((author) => {
        if (author.id === Number(id)) {
            return author;
        }
    })
);

export default authors;