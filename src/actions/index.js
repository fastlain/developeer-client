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