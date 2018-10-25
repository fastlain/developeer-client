import * as ACTIONS from '../actions';

const initialState = {
    username: "dummy_user",
    credit: 0,
    forms: [],
    notifications: [
        {
            id: 0,
            text: "Welcome to Developeer!"
        }
    ]
}

const developeerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_CREDIT:
            return Object.assign({}, state, { credit: state.credit + 1 });
        case ACTIONS.REMOVE_CREDIT:
            return Object.assign({}, state, { credit: state.credit - 1 });
        case ACTIONS.CLOSE_NOTIFICATION:
            const updatedNotifications = state.notifications.filter(notification => (
                notification.id !== action.id
            ));
            return Object.assign({}, state, { notifications: updatedNotifications });
        default:
            return state;
    }
};

export default developeerReducer;