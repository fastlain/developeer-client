import * as ACTIONS from '../actions';

const initialState = {
    authToken: null,
    user: null,
    forms: [
        {
            id: 0,
            name: "Capstone 1 UI Feedback",
            projectUrl: "http://google.com",
            shareableUrl: "placeholder",
            pendingRequests: 1,
            questions: [
                "Did you have any problems navigating around the site?",
                "Was the login process clear?",
                "Did you find like the animations or were they distracting?",
                "Any additional feedback?"
            ]
        },
        {
            id: 1,
            name: "Portfolio Design Help",
            projectUrl: "http://google.com",
            shareableUrl: "placeholder",
            pendingRequests: 3,
            questions: [
                "Does the color palette convey an appropriate mood for the site?",
                "Did you notice any page elements that looked out of place?",
                "Were the animations smooth on your device?",
                "What device and browser did you use to view the site?"
            ]
        }
    ],
    reviews: [
        {
            id: 0,
            formId: 0,
            reviewer: "reviewer123",
            responses: [
                "Nope, everything was intuitive",
                "Yes, I was able to create a new account successfully",
                "They were good, but you could increase the transition duration to make them snappier",
                "Great job!"
            ],
            date: new Date()
        },
        {
            id: 1,
            formId: 0,
            reviewer: "reviewerABC",
            responses: [
                "Navigation was very clear",
                "I couldn't figure out how to log out of the app",
                "Not distracting, just right!",
                "I would have liked to see more information up front on the dashboard instead of on separate pages"
            ],
            date: new Date()
        },
        {
            id: 2,
            formId: 1,
            reviewer: "reviewerXYZ",
            responses: [
                "Yes, it had a light and fun vibe",
                "I would suggest using consistently round or square corners throughout the site",
                "Like silk",
                "Windows laptop, Chrome 70"
            ],
            date: new Date()
        }
    ]
}

const developeerReducer = (state = initialState, action) => {
    switch (action.type) {
        // case ACTIONS.CLOSE_NOTIFICATION:
        //     const updatedNotifications = state.notifications.filter(notification => (
        //         notification.id !== action.id
        //     ));
        //     return { ...state, notifications: updatedNotifications };

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
            return { ...state, forms: updatedForms };


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