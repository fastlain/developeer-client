import React from 'react';
import { shallow } from 'enzyme';

import LandingPageContent from '../LandingPageContent';

describe('<LandingPageContent />', () => {
    it('Renders without crashing', () => {
        shallow(<LandingPageContent />);
    });

    it('Renders Links and Features if not logged in', () => {
        const wrapper = shallow(<LandingPageContent isLoggedIn={false} />);
        expect(wrapper.find('Redirect')).toHaveLength(0);
        expect(wrapper.find('StyledLink')).toHaveLength(2);
        expect(wrapper.find('Features')).toHaveLength(1);
    });

    it('Redirects if logged in', () => {
        const wrapper = shallow(<LandingPageContent isLoggedIn={true} />);
        expect(wrapper.find('Redirect')).toHaveLength(1);
    });

});