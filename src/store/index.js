import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import thunk from 'redux-thunk';

import departments from './departments';
import employees from './employees';

const router = routerMiddleware(browserHistory);

const rootReducer = combineReducers({
    departments,
    employees,
    form: formReducer,
    routing: routerReducer
});

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk, router),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    return store;
}
