import React from 'react';
import FilterLink from '../../containers/FilterLink';
import { SortingFilters } from '../../actions/book';

const FilterPublish = () => (
    <>
        &nbsp;<FilterLink filter={SortingFilters.YEAR_PUBLISH}>
            <span className="badge badge-secondary">&#8593;</span>
        </FilterLink>&nbsp;
        <FilterLink filter={SortingFilters.REVERSE_YEAR_PUBLISH}>
            <span className="badge badge-secondary">&#8595;</span>
        </FilterLink>
    </>
);

export default FilterPublish;