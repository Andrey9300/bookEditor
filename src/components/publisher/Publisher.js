import React from 'react'
import PropTypes from 'prop-types'

const Publisher = (publisher) => (
    <tr>
        <td>{publisher.name}</td>
    </tr>
);

Publisher.propTypes = {
    name: PropTypes.string.isRequired
};

export default Publisher;