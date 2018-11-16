import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../Footer';
import styles from '../../css_modules/Footer.module.css';

describe('<Footer />', () => {
    it('Renders without crashing', () => {
        shallow(<Footer />);
    });
});