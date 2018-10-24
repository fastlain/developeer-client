import * as ACTIONS from '../actions';

const initialState = {
    credit: 0
}

const developeerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_CREDIT:
            return Object.assign({}, state, { credit: state.credit + 1 });
        case ACTIONS.REMOVE_CREDIT:
            return Object.assign({}, state, { credit: state.credit - 1 });
        default:
            console.warn(`Action '${action}' not recognized.`);
            return state;
    }
};

export default developeerReducer;