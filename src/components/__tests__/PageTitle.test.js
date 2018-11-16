import React from 'react';
import { shallow } from 'enzyme';

import PageTitle from '../PageTitle';

describe('<PageTitle />', () => {
    it('Renders without crashing', () => {
        shallow(<PageTitle />);
    });

    it('Renders children in an h1', () => {
        const child = "Test Title";
        const wrapper = shallow(<PageTitle>{child}</PageTitle>);
        expect(wrapper.find('h1').text()).toEqual(child);
    });

});