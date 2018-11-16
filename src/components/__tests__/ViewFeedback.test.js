import React from 'react';
import { shallow } from 'enzyme';

import ViewFeedback from '../ViewFeedback';

describe('<ViewFeedback />', () => {
    const match = {
        params: {
            reviewId: '123'
        }
    };

    const reviews = [{
        _id: '123',
        formVersion: 'abc',
        responses: ['r1', 'r2', 'r3'],
        reviewerName: 'reviewer',
        dateObj: new Date()
    }];

    const versions = [{
        _id: 'abc',
        questions: ['q1', 'q2', 'q3']
    }]

    it('Renders without crashing', () => {
        shallow(<ViewFeedback match={match} reviews={reviews} versions={versions} />);
    });

    it('Renders provided review', () => {
        const wrapper = shallow(<ViewFeedback match={match} reviews={reviews} versions={versions} />);
        expect(wrapper.find('h3 .innerHeading').text()).toEqual(reviews[0].reviewerName);
        expect(wrapper.find('h4 .innerHeading').text()).toEqual(reviews[0].dateObj.toLocaleString());
        expect(wrapper.find('.questionResponseWrapper')).toHaveLength(3);
    });

});