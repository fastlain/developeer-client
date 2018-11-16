import React from 'react';
import { shallow, mount } from 'enzyme';

import Header from '../Header';
import styles from '../../css_modules/Header.module.css';

describe('<Header />', () => {
    it('Renders without crashing', () => {
        shallow(<Header />);
    });

    it('Renders a logOut button if logged in', () => {
        const wrapper = shallow(<Header isLoggedIn={true} />);
        expect(wrapper.find('Button')).toHaveLength(1);
    });

    it('Calls props.logOut when logOut Button clicked', () => {
        const logOut = jest.fn();
        const wrapper = shallow(<Header isLoggedIn={true} logOut={logOut} />);
        wrapper.find('Button').simulate('click');
        expect(logOut).toHaveBeenCalled();
    });

    it('Renders a username if provided', () => {
        const wrapper = shallow(<Header username="user" />);
        expect(wrapper.find('.username').text()).toEqual('user');
    });


});