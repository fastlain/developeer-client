import React from 'react';
import { shallow } from 'enzyme';

import PageTitle from '../PageTitle';

describe('<PageTitle />', () => {
    it('Renders without crashing', () => {
        shallow(<PageTitle />);
    });

    it('Renders children in an h2', () => {
        const child = "Test Title";
        const wrapper = shallow(<PageTitle>{child}</PageTitle>);
        expect(wrapper.find('h2').text()).toEqual(child);
    });

});