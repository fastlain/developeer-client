import React from 'react';
import { shallow } from 'enzyme';

import { GiveFeedback } from '../GiveFeedback';

describe('<GiveFeedback />', () => {
    it('Renders without crashing', () => {
        shallow(<GiveFeedback />);
    });

    it('Renders a start <Button> when state.started is false (default)', () => {
        const wrapper = shallow(<GiveFeedback />);
        expect(wrapper.state().started).toEqual(false);
        expect(wrapper.find('Button')).toHaveLength(1);
        expect(wrapper.find('Connect(FeedbackForm)')).toHaveLength(0);
    });

    it('Sets state.started to true on calling startFeedback, renders FeedbackForm', () => {
        const wrapper = shallow(<GiveFeedback />);
        wrapper.instance().startFeedback();
        expect(wrapper.state().started).toEqual(true);
        expect(wrapper.find('Button')).toHaveLength(0);
        expect(wrapper.find('Connect(FeedbackForm)')).toHaveLength(1);
    });

});