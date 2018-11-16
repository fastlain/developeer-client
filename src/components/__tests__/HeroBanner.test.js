import React from 'react';
import { shallow } from 'enzyme';

import HeroBanner from '../HeroBanner';

describe('<HeroBanner />', () => {
    it('Renders without crashing', () => {
        shallow(<HeroBanner />);
    });
});