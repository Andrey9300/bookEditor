import React from 'react';
import FilterLink from '../../containers/FilterLink';
import { SortingFilters } from '../../actions/book';

const FilterTitle = () => (
    <>
        &nbsp;<FilterLink filter={SortingFilters.ALPHABETICALLY}>
            <span className="badge badge-secondary">&#8593;</span>
        </FilterLink>&nbsp;
        <FilterLink filter={SortingFilters.REVERSE_ALPHABETICALLY}>
            <span className="badge badge-secondary">&#8595;</span>
        </FilterLink>
    </>
);

export default FilterTitle;