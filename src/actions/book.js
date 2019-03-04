export const addBook = book => ({
    type: 'ADD_BOOK',
    book: book
});

export const editBook = book => ({
    type: 'EDIT_BOOK',
    book: book
});

export const setSortingFilter = filter => ({
    type: 'SET_SORTING_FILTER',
    filter: filter
});

export const SortingFilters = {
    ALPHABETICALLY: 'ALPHABETICALLY',
    REVERSE_ALPHABETICALLY: 'REVERSE_ALPHABETICALLY',
    YEAR_PUBLISH: 'YEAR_PUBLISH',
    REVERSE_YEAR_PUBLISH: 'REVERSE_YEAR_PUBLISH'
};