import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserForm } from '../UserForm';

describe('<UserForm />', () => {
    const mountWithRouter = component => {
        return mount(<Router>{component}</Router>);
    }

    const matchCreate = {
        params: {
            type: 'create'
        }
    };
    const matchLogin = {
        params: {
            type: 'login'
        }
    }

    it('Renders without crashing', () => {
        mountWithRouter(<UserForm match={matchLogin} />);
        mountWithRouter(<UserForm match={matchCreate} />);
    });

    it('Redirects when user is logged in', () => {
        const wrapper = mountWithRouter(<UserForm match={matchCreate} isLoggedIn={true} />);
        expect(wrapper.find('Redirect')).toHaveLength(1);
    });

    it('Renders `Create Account` components when matching route param', () => {
        const wrapper = mountWithRouter(<UserForm match={matchCreate} />);
        expect(wrapper.find('legend').text()).toEqual('Create Account');
        expect(wrapper.find('Button').html()).toMatch('CREATE ACCOUNT');
        expect(wrapper.find('.hide')).toHaveLength(0);
        expect(wrapper.find('.toggleWrapper').children('p').text()).toEqual('Already have an account?');
    });

    it('Renders `Log In` components when matching route param', () => {
        const wrapper = mountWithRouter(<UserForm match={matchLogin} />);
        expect(wrapper.find('legend').text()).toEqual('Log In');
        expect(wrapper.find('Button').html()).toMatch('LOG IN');
        expect(wrapper.find('.hide')).toHaveLength(1);
        expect(wrapper.find('.toggleWrapper').children('p').text()).toEqual('New to Developeer?');
    });

    it('Renders disabled button if submitting', () => {
        const wrapper = mountWithRouter(<UserForm match={matchLogin} />);
        wrapper.setState({ isSubmitting: true });
        expect(wrapper.find('Button', { type: 'submit' }).hasClass('disabled'));
    });

    it('Creates error messages if blank form is submitted', () => {
        const wrapper = mountWithRouter(< UserForm match={matchCreate} />)
        wrapper.find(UserForm).instance().handleFormSubmit({ preventDefault: () => null });
        const state = wrapper.find(UserForm).state();
        expect(state.usernameErr).toEqual('Must be between 1 and 20 characters');
        expect(state.passwordErr).toEqual('Must be between 10 and 72 characters');
    });

    it('Creates error messages if username has untrimmed whitespace', () => {
        const wrapper = mountWithRouter(< UserForm match={matchCreate} />)
        wrapper.find(UserForm).setState({ username: ' test ' });
        wrapper.find(UserForm).instance().handleFormSubmit({ preventDefault: () => null });
        const state = wrapper.find(UserForm).state();
        expect(state.usernameErr).toEqual('Cannot start or end with whitespace');
    });

    it('Dispatches storeAuthInfo on successful local login', () => {
        const user = 'user';
        const token = { authToken: 'token' };
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => {
                    return Promise.resolve(token);
                }
            })
        );
        const dispatch = jest.fn();
        const wrapper = mountWithRouter(< UserForm match={matchCreate} dispatch={dispatch} />)
        return wrapper.find(UserForm).instance().loginLocal(user).then(() => {
            expect(dispatch).toHaveBeenCalled();
        });
    });
});