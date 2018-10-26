import * as ACTIONS from '../actions';

const initialState = {
    username: "dummy_user",
    credit: 0,
    forms: [
        {
            id: 0,
            name: "dummyForm0",
            projectUrl: "https://www.michaelallain.com",
            shareableUrl: "https://www.michaelallain.com",
            pendingRequests: 1,
            questions: [
                "Question 1 text here",
                "Question 2 text here",
                "Question 3 text here"
            ]
        },
        {
            id: 1,
            name: "dummyForm1",
            pendingRequests: 3,
            projectUrl: "https://www.michaelallain.com",
            shareableUrl: "https://www.michaelallain.com",
            questions: [
                "Question 1 text here",
                "Question 2 text here",
                "Question 3 text here"
            ]
        }
    ],
    reviews: [
        {
            id: 0,
            formId: 0,
            reviewer: "reviewer123",
            responses: [
                "Response to question 1",
                "Response to question 2",
                "Response to question 3",
            ],
            date: new Date()
        },
        {
            id: 1,
            formId: 0,
            reviewer: "reviewerabc",
            responses: [
                "Response to question 1",
                "Response to question 2",
                "Response to question 3",
            ],
            date: new Date()
        }
    ],
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
        case ACTIONS.ADD_REQUEST:
            const formsAddedRequest = state.forms.map(form => {
                return (form.id === action.formId) ? Object.assign({}, form, { pendingRequests: form.pendingRequests + 1 }) : form;
            });
            return Object.assign({}, state, { forms: formsAddedRequest });
        case ACTIONS.REMOVE_REQUEST:
            const formsRemovedRequest = state.forms.map(form => {
                return (form.id === action.formId) ? Object.assign({}, form, { pendingRequests: form.pendingRequests - 1 }) : form;
            });
            return Object.assign({}, state, { forms: formsRemovedRequest });
        default:
            return state;
    }
};

export default developeerReducer;