import * as ACTIONS from '../actions';

const initialState = {
    authToken: null,
    user: null,
    popup: ''
}

const developeerReducer = (state = initialState, action) => {
    switch (action.type) {
        // case ACTIONS.CLOSE_NOTIFICATION:
        //     const updatedNotifications = state.notifications.filter(notification => (
        //         notification.id !== action.id
        //     ));
        //     return { ...state, notifications: updatedNotifications };

        ////////////// Popup Actions /////////////////
        case ACTIONS.SET_POPUP:
            return { ...state, popup: action.message };
        case ACTIONS.CLEAR_POPUP:
            return { ...state, popup: '' };

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