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
                "Form0Question 1 text here",
                "Form0Question 2 text here",
                "Form0Question 3 text here"
            ]
        },
        {
            id: 1,
            name: "dummyForm1",
            pendingRequests: 3,
            projectUrl: "https://www.michaelallain.com",
            shareableUrl: "https://www.michaelallain.com",
            questions: [
                "Form1Question 1 text here",
                "Form1Question 2 text here",
                "Form1Question 3 text here"
            ]
        }
    ],
    reviews: [
        {
            id: 0,
            formId: 0,
            reviewer: "reviewer123",
            responses: [
                "Review0 Response to question 1",
                "Review0 Response to question 2",
                "Review0 Response to question 3",
            ],
            date: new Date()
        },
        {
            id: 1,
            formId: 0,
            reviewer: "reviewerabc",
            responses: [
                "Review1 Response to question 1",
                "Review1 Response to question 2",
                "Review1 Response to question 3",
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
        case ACTIONS.CREATE_FORM:
            const newForm = {
                id: Math.floor(Math.random() * 1000),
                name: action.formName,
                projectUrl: action.projectUrl,
                shareableUrl: 'http://wwww.michaelallain.com',
                questions: action.questions,
                pendingRequests: 0
            };
            const updatedForms = [...state.forms];
            updatedForms.push(newForm);
            return Object.assign({}, state, { forms: updatedForms });
        default:
            return state;
    }
};

export default developeerReducer;