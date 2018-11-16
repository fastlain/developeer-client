import React from 'react';
import { shallow, mount } from 'enzyme';

import Features from '../Features';
import styles from '../../css_modules/Features.module.css';

describe('<Features />', () => {
    it('Renders without crashing', () => {
        shallow(<Features />);
    });
});