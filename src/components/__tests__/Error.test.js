import React from 'react';
import { shallow } from 'enzyme';

import Error from '../Error';

describe('<Error />', () => {
    it('Renders without crashing', () => {
        shallow(<Error />);
    });

    it('Renders nothing if no message is provided', () => {
        const wrapper = shallow(<Error />);
        expect(wrapper.html()).toEqual(null);
    });

    it('Renders the provided message', () => {
        const message = 'Hello World';
        const wrapper = shallow(<Error message={message} />);
        expect(wrapper.find('.error').text()).toEqual(message);
    });
});