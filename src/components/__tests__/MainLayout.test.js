import React from 'react';
import { shallow } from 'enzyme';

import { MainLayout } from '../MainLayout';

describe('<MainLayout />', () => {
    it('Renders without crashing', () => {
        shallow(<MainLayout />);
    });

    it('Dispatches clearAuth on logout', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<MainLayout dispatch={dispatch} />);
        wrapper.instance().handleLogout();
        expect(dispatch).toHaveBeenCalledWith({ "type": "CLEAR_AUTH" });
    });

});