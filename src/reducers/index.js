import * as ACTIONS from '../actions';

const initialState = {
    authToken: null,
    user: null
}

const developeerReducer = (state = initialState, action) => {
    switch (action.type) {
        // case ACTIONS.CLOSE_NOTIFICATION:
        //     const updatedNotifications = state.notifications.filter(notification => (
        //         notification.id !== action.id
        //     ));
        //     return { ...state, notifications: updatedNotifications };

        ////////////// Authorization Actions /////////////////
        case ACTIONS.SET_AUTH_TOKEN:
            return { ...state, authToken: action.authToken };
        case ACTIONS.SET_USER:
            return { ...state, user: action.user };
        case ACTIONS.CLEAR_AUTH:
            return { ...state, authToken: null, user: null };

        default:
            return state;
    }
};

export default developeerReducer;