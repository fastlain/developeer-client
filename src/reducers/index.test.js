import developeerReducer from './index';
import { setPopup, clearPopup, setAuthToken, setUser, clearAuth } from '../actions';

describe('developeerReducer', () => {
    it('Should set the initial state if nothing is passed in', () => {
        const state = developeerReducer(undefined, { type: 'UNKNOWN' });
        expect(state).toEqual({
            authToken: null,
            user: null,
            popup: ''
        });
    });

    it('Should return the current state if action is unknown', () => {
        const currentState = {}
        const newState = developeerReducer(currentState, { type: 'UNKNOWN' });
        expect(newState).toEqual(currentState);
    });


    describe('setPopup', () => {
        it('Should set the popup message', () => {
            const state = { popup: '' };
            const newState = developeerReducer(state, setPopup('hello world'));
            expect(newState).toEqual({ popup: 'hello world' })
        });
    });

    describe('clearPopup', () => {
        it('Should clear the popup message', () => {
            const state = { popup: 'message' };
            const newState = developeerReducer(state, clearPopup());
            expect(newState).toEqual({ popup: '' })
        });
    });

    describe('setAuthToken', () => {
        it('Should set the auth token', () => {
            const state = { authToken: '' };
            const newState = developeerReducer(state, setAuthToken('token'));
            expect(newState).toEqual({ authToken: 'token' })
        });
    });

    describe('setUser', () => {
        it('Should set the user', () => {
            const state = { user: '' };
            const newState = developeerReducer(state, setUser('user'));
            expect(newState).toEqual({ user: 'user' })
        });
    });

    describe('clearAuth', () => {
        it('Should clear the authToken and the user', () => {
            const state = { authToken: 'token', user: 'user' };
            const newState = developeerReducer(state, clearAuth());
            expect(newState).toEqual({ authToken: null, user: null });
        });
    });
});