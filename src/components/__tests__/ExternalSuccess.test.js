import React from 'react';
import { shallow, mount } from 'enzyme';

import ExternalSuccess from '../ExternalSuccess';

describe('<ExternalSuccess />', () => {
    it('Renders without crashing', () => {
        shallow(<ExternalSuccess />);
    });
});