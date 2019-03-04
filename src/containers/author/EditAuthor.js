import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getAuthor } from '../../reducers/authors';
import { editAuthor } from '../../actions/author';

const EditAuthor = (store) => {
    const author = getAuthor(store, store.match.params.id);
    let [name, setName] = useState(author.name);
    let [surname, setSurname] = useState(author.surname);

    const onSubmit = (e) => {
        e.preventDefault();

        let authorForSave = {id: author.id, name, surname};
        store.dispatch(editAuthor(authorForSave));

        store.history.push('/author/all/');
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Имя</label>
                <input type="text" className="form-control" value={name} maxLength="20" required
                       onChange={e => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Фамилия</label>
                <input type="text" className="form-control" value={surname} maxLength="20" required
                       onChange={e => setSurname(e.target.value)}/>
            </div>
            <button className="btn btn-primary" type="submit">Сохранить</button>
        </form>
    );
};

const mapStateToProps = state => ({
    authors: state.authors ? state.authors.authors : [],
});

export default connect(mapStateToProps)(EditAuthor)