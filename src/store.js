import { createStore } from 'redux';

import developeerReducer from './reducers';

export default createStore(developeerReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());