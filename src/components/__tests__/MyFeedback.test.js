import React from 'react';
import { shallow, mount } from 'enzyme';

import { MyFeedback } from '../MyFeedback';

describe('<MyFeedback />', () => {
    const forms = [
        {
            _id: 123,
            name: "123",
            pendingRequests: 5
        },
        {
            _id: 456,
            name: "456",
            pendingRequests: 2
        }
    ];

    const credit = 5;

    it('Renders without crashing', () => {
        shallow(<MyFeedback forms={forms} credit={credit} />);
    });

    it('Renders array of <FormSummary>s', () => {
        const wrapper = shallow(<MyFeedback forms={forms} credit={credit} />);
        expect(wrapper.find('Connect(FormSummary)')).toHaveLength(2);
    });
});