import { combineReducers } from 'redux';
import books from './books';
import authors from './authors';
import publishers from './publishers';
import sortingFilters from './sortingFilters';

export default combineReducers({
    books,
    authors,
    publishers,
    sortingFilters
});