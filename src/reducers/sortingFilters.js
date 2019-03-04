import { SortingFilters } from '../actions/book';

const sortingFilters = (
    state = {
        filter: SortingFilters.ALPHABETICALLY
    },
    action
) => {
    switch (action.type) {
        case 'SET_SORTING_FILTER':
            console.log('titFilter1', state, action);
            return {
                ...state,
                filter: action.filter
            };
        default:
            return state
    }
};

export default sortingFilters;