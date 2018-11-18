import React from 'react';
import { shallow, mount } from 'enzyme';

import { ReviewFeedback } from '../ReviewFeedback';

describe('<ReviewFeedback />', () => {

    const match = {
        params: {
            id: '123'
        }
    };

    const forms = [{
        _id: '123',
        name: 'formName'
    }];

    it('Renders without crashing', () => {
        shallow(<ReviewFeedback match={match} forms={forms} />);
    });

});