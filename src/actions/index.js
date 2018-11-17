import jwtDecode from 'jwt-decode';
import { saveAuthToken, clearAuthToken } from '../local-storage';
import { API_BASE_URL } from '../config';

// increase or decrease the pending requests of specified form
export const changeRequests = (formId, change) => (dispatch, getState) => {
    const authToken = getState().authToken;
    const form = getState().user.forms.find(form => form._id === formId);
    const updatedRequests = form.pendingRequests + change;

    return fetch(`${API_BASE_URL}/forms/${formId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({ pendingRequests: updatedRequests })
    })
        .then(res => res.json())
        .then(user => {
            dispatch(setUser(user));
        })
        .catch(err => {
            // TODO: create action and state handlers for auth errors
            // dispatch(authError(err));
            console.error(err);
        });
}

// export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
// export const closeNotification = (id) => ({
//     type: CLOSE_NOTIFICATION,
//     id
// });


/////////////// POPUP NOTIFICATIONS /////////////////

export const showPopup = message => dispatch => {
    dispatch(setPopup(message))
    setTimeout(() => {
        dispatch(clearPopup())
    }, 2500);
}

export const SET_POPUP = 'SET_POPUP';
export const setPopup = message => ({
    type: SET_POPUP,
    message
});

export const CLEAR_POPUP = 'CLEAR_POPUP';
export const clearPopup = message => ({
    type: CLEAR_POPUP,
    message
});

/////////////// AUTHORIZATION /////////////////

export const storeAuthInfo = token => dispatch => {
    // decode and store user data in Redux stat
    const decodedToken = jwtDecode(token);
    dispatch(setUser(decodedToken.user));

    // store token in Redux state
    dispatch(setAuthToken(token));
    // store token in local storage
    saveAuthToken(token);
};

export const SET_USER = 'SET_USER';
export const setUser = user => ({
    type: SET_USER,
    user
});

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});

export const refreshAuthToken = () => (dispatch, getState) => {
    // TODO: create action and state handlers for auth request 
    // dispatch(authRequest()); // or authPending(), etc.
    const oldToken = getState().authToken;
    return fetch(`${API_BASE_URL}/auth/loginjwt`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${oldToken}`
        }
    })
        .then(res => res.json())
        .then(({ authToken }) => {
            dispatch(storeAuthInfo(authToken));
        })
        .catch(err => {
            // TODO: create action and state handlers for auth errors
            // dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken();
        });
}

