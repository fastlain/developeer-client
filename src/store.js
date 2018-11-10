import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import { setAuthToken, refreshAuthToken } from './actions';

import developeerReducer from './reducers';

// set up Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(developeerReducer, composeEnhancers(applyMiddleware(thunk)));

// load authentication token from localStorage if it exists
const authToken = loadAuthToken();
if (authToken) {
    store.dispatch(setAuthToken(authToken));
    store.dispatch(refreshAuthToken());
}

export default store;