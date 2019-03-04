import React from 'react';
import PropTypes from 'prop-types';

const Link = (store) => {
    return (
        <button
            onClick={store.onClick}
        >
        {store.children}
        </button>
    );
};

Link.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link;