import React from 'react';
import { shallow, mount } from 'enzyme';

import { UserForm } from '../UserForm';
import styles from '../../css_modules/UserForm.module.css';

describe('<UserForm />', () => {
    const matchCreate = {
        params: {
            type: 'create'
        }
    };
    const matchLogin = {
        params: 'login'
    }

    it('Renders without crashing', () => {
        shallow(<UserForm match={matchCreate} />);
        shallow(<UserForm match={matchLogin} />);
    });

    it('Redirects when user is logged in', () => {
        const wrapper = shallow(<UserForm match={matchCreate} isLoggedIn={true} />);
        expect(wrapper.find('Redirect')).toHaveLength(1);
    });

    it('Renders `Create Account` components when matching route param', () => {
        const wrapper = shallow(<UserForm match={matchCreate} />);
        expect(wrapper.find('legend').text()).toEqual('Create Account');
        expect(wrapper.find('Button').html()).toMatch('CREATE ACCOUNT');
        expect(wrapper.find('.hide')).toHaveLength(0);
        expect(wrapper.find('.toggleWrapper').children('p').text()).toEqual('Already have an account?');
    });

    it('Renders `Log In` components when matching route param', () => {
        const wrapper = shallow(<UserForm match={matchLogin} />);
        expect(wrapper.find('legend').text()).toEqual('Log In');
        expect(wrapper.find('Button').html()).toMatch('LOG IN');
        expect(wrapper.find('.hide')).toHaveLength(1);
        expect(wrapper.find('.toggleWrapper').children('p').text()).toEqual('New to Developeer?');
    });

    it('Renders disabled button if submitting', () => {
        const wrapper = shallow(<UserForm match={matchLogin} />);
        wrapper.setState({ isSubmitting: true });
        expect(wrapper.find('Button', { type: 'submit' }).hasClass('disabled'));
    });


});