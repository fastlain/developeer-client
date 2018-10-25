export const ADD_CREDIT = 'ADD_CREDIT';
export const addCredit = () => ({
    type: ADD_CREDIT
});

export const REMOVE_CREDIT = 'REMOVE_CREDIT';
export const removeCredit = () => ({
    type: REMOVE_CREDIT
});

export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const closeNotification = (id) => ({
    type: CLOSE_NOTIFICATION,
    id
});