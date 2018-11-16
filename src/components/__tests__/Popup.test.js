import React from 'react';
import { shallow } from 'enzyme';

import { Popup } from '../Popup';

describe('<Popup />', () => {
    it('Renders without crashing', () => {
        shallow(<Popup message="" />);
    });

    it('Renders null content if blank message is passed', () => {
        const wrapper = shallow(<Popup message="" />);
        expect(wrapper.find('p')).toHaveLength(0);
    });

    it('Renders provided message', () => {
        const message = 'test';
        const wrapper = shallow(<Popup message={message} />);
        expect(wrapper.find('p').text()).toEqual(message);

    });

});