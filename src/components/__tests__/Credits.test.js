import React from 'react';
import { shallow } from 'enzyme';

import Credits from '../Credits';

describe('<Credits />', () => {
    it('Renders without crashing', () => {
        shallow(<Credits />);
    });

    it('Renders the credits', () => {
        const wrapper = shallow(<Credits credits={5} />);
        expect(wrapper.find('.credits').text()).toEqual("5");
    });
});