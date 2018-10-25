import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import developeerReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(developeerReducer, composeEnhancers(applyMiddleware(thunk)));