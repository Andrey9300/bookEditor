import React from 'react'
import PropTypes from 'prop-types'

const PublisherForBook = (publisher) => (
    <span>{publisher.name}</span>
);

PublisherForBook.propTypes = {
    name: PropTypes.string.isRequired
};

export default PublisherForBook;