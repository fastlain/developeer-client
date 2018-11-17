import { changeRequests, showPopup, storeAuthInfo, refreshAuthToken, SET_POPUP, setPopup, CLEAR_POPUP, clearPopup, SET_USER, setUser, SET_AUTH_TOKEN, setAuthToken, CLEAR_AUTH, clearAuth } from './index';

describe('changeRequests', () => {
    it('Should dispatch setUser', () => {
        const user = 'user';

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return user;
                }
            })
        );

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            authToken: 'token',
            user: {
                forms: [{
                    _id: '123'
                }]
            }
        }));

        return changeRequests('123', 1)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledWith(setUser(user))
        })
    });

});

describe('showPopup', () => {
    it('Should dispatch setPopup and then clearPopup', () => {
        const message = 'hello world';
        const dispatch = jest.fn();

        showPopup(message)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(setPopup(message));
        setTimeout(() => {
            expect(dispatch).toHaveBeenCalledWith(clearPopup());
        }, 3000);
    });
});

describe('setPopup', () => {
    it('Should return the action', () => {
        const message = 'message';
        const action = setPopup(message);
        expect(action.type).toEqual(SET_POPUP);
        expect(action.message).toEqual(message);
    });
});

describe('clearPopup', () => {
    it('Should return the action', () => {
        const action = clearPopup();
        expect(action.type).toEqual(CLEAR_POPUP);
    });
});

describe('storeAuthInfo', () => {
    it('Should dispatch setUser and setAuthToken', () => {
        // dummy token with payload of {"user": "user"}
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciJ9.NOC5hykTPymQdhWjVHybcPv8etaOClOs4Ud04wcamX4';

        const dispatch = jest.fn();

        storeAuthInfo(token)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(setUser('user'));
        expect(dispatch).toHaveBeenCalledWith(setAuthToken(token));
    });
});



describe('setUser', () => {
    it('Should return the action', () => {
        const user = 'user'
        const action = setUser(user);
        expect(action.type).toEqual(SET_USER);
        expect(action.user).toEqual(user);
    });
});

describe('setAuthToken', () => {
    it('Should return the action', () => {
        const token = 'token';
        const action = setAuthToken(token);
        expect(action.type).toEqual(SET_AUTH_TOKEN);
        expect(action.authToken).toEqual(token);
    });
});

describe('clearAuth', () => {
    it('Should return the action', () => {
        const action = clearAuth();
        expect(action.type).toEqual(CLEAR_AUTH);
    });
});

describe('refreshAuthToken', () => {
    it('Should dispatch storeAuthInfo on success', () => {
        const token = { authToken: 'token' };

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return token;
                }
            })
        );

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            authToken: 'token'
        }));

        refreshAuthToken()(dispatch, getState).then(() => {
            expect(dispatch).toHaveBeenCalledWith(storeAuthInfo('token'));
        })
    });
    it('Should dispatch clearAuth on failure', () => {

        global.fetch = jest.fn().mockImplementation(() => Promise.reject());

        const dispatch = jest.fn();
        const getState = jest.fn().mockImplementation(() => ({
            authToken: 'token'
        }));

        refreshAuthToken()(dispatch, getState).then(() => {
            expect(dispatch).toHaveBeenCalledWith(clearAuth());
        })
    });

});
