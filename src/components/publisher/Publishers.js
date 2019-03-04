import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Publisher from "./Publisher";

const Publishers = (publishers) => {
    if (publishers.publishers.length) {
        return (
            <>
                <div className="alert alert-info" role="alert">
                    <Link to='/publisher/add'>Добавить издателя</Link>
                </div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Название</th>
                    </tr>
                    </thead>
                    <tbody>
                    {publishers.publishers.map(publisher => (
                        <Publisher key={publisher.id} {...publisher}/>
                    ))}
                    </tbody>
                </table>
            </>
        );
    } else {
        return (
            <div className="alert alert-info" role="alert">
                Еще не было добавлено ни одного издателя. <Link to='/publisher/add'>Добавить издателя</Link>.
            </div>
        )
    }
};

Publishers.propTypes = {
    publisher: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired)
};

export default Publishers;