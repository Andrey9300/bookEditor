import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addAuthor } from '../../actions/author';

const AddAuthor = (store) => {
    let [name, setName] = useState('');
    let [surname, setSurname] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const randomId = Math.floor(Date.now() * Math.random());
        let author = {id: randomId, name, surname};
        store.dispatch(addAuthor(author));

        store.history.push('/author/all/');
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Имя</label>
                <input type="text" className="form-control" value={name} maxLength="20"
                       onChange={e => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label >Фамилия</label>
                <input type="text" className="form-control" value={surname} maxLength="20"
                       onChange={e => setSurname(e.target.value)}/>
            </div>
            <button className="btn btn-primary" type="submit">Добавить автора</button>
        </form>
    );
};

export default connect()(AddAuthor)