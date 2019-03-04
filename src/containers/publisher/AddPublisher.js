import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPublisher } from '../../actions/publisher';

const AddPublisher = (store) => {
    let [name, setName] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const randomId = Math.floor(Date.now() * Math.random());
        let publisher = {id: randomId, name};
        store.dispatch(addPublisher(publisher));

        store.history.push('/publisher/all/');
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Название издательства</label>
                <input type="text" className="form-control" value={name} maxLength="20"
                       onChange={e => setName(e.target.value)}/>
            </div>
            <button className="btn btn-primary" type="submit">Добавить издателя</button>
        </form>
    );
};

export default connect()(AddPublisher)