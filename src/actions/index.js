import jwtDecode from 'jwt-decode';
import { saveAuthToken, clearAuthToken } from '../local-storage';
import { API_BASE_URL } from '../config';

export const ADD_CREDIT = 'ADD_CREDIT';
export const addCredit = () => ({
    type: ADD_CREDIT
});

export const REMOVE_CREDIT = 'REMOVE_CREDIT';
export const removeCredit = () => ({
    type: REMOVE_CREDIT
});


export const incRequest = (formId) => dispatch => {
    dispatch(addRequest(formId));
    dispatch(removeCredit());
}

export const ADD_REQUEST = 'ADD_REQUEST';
export const addRequest = (formId) => ({
    type: ADD_REQUEST,
    formId
});

export const decRequest = (formId) => dispatch => {
    dispatch(removeRequest(formId));
    dispatch(addCredit());
}

export const REMOVE_REQUEST = 'REMOVE_REQUEST';
export const removeRequest = (formId) => ({
    type: REMOVE_REQUEST,
    formId
});

export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const closeNotification = (id) => ({
    type: CLOSE_NOTIFICATION,
    id
});

export const CREATE_FORM = 'CREATE_FORM';
export const createForm = (formName, projectUrl, questions) => ({
    type: CREATE_FORM,
    formName,
    projectUrl,
    questions
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
        .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
        .catch(err => {
            // TODO: create action and state handlers for auth errors
            // dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken();
        });
}

