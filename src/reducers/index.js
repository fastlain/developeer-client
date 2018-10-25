import * as ACTIONS from '../actions';

const initialState = {
    user: {
        username: "dummy_user",
        credit: 0,
        forms: []
    }
}

const developeerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_CREDIT:
            return Object.assign({}, state, { credit: state.user.credit + 1 });
        case ACTIONS.REMOVE_CREDIT:
            return Object.assign({}, state, { credit: state.user.credit - 1 });
        default:
            console.warn(`Action '${action}' not recognized.`);
            return state;
    }
};

export default developeerReducer;