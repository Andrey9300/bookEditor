import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Authors from './containers/author/Authors';
import Books from './containers/book/Books';
import Publishers from './containers/publisher/Publishers';
import AddPublisher from './containers/publisher/AddPublisher';
import AddAuthor from './containers/author/AddAuthor';
import AddBook from './containers/book/AddBook';
import EditAuthor from './containers/author/EditAuthor';
import EditBook from './containers/book/EditBook';
import {loadState, saveState} from './helpers/localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(throttle(() => {
    saveState({
        books: store.getState().books,
        authors: store.getState().authors,
        publishers: store.getState().publishers,
        sortingFilters: store.getState().sortingFilters
    })
}, 1000));

render(
    <Provider store={store}>
        <Router>
            <>
                <Header/>
                <div className="container" style={{marginTop: '70px'}}>
                    <div className="starter-template">
                        <Route path="/" exact component={Welcome} />
                        <Route path="/book/all/" component={Books} />
                        <Route path="/book/add/" component={AddBook} />
                        <Route path="/book/edit/:id" component={EditBook} />
                        <Route path="/author/all/" component={Authors} />
                        <Route path="/author/add/" component={AddAuthor} />
                        <Route path="/author/edit/:id" component={EditAuthor} />
                        <Route path="/publisher/all/" component={Publishers} />
                        <Route path="/publisher/add/" component={AddPublisher} />
                    </div>
                </div>
            </>
        </Router>
    </Provider>,
    document.getElementById('root')
);