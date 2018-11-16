import React from 'react';
import { shallow, mount } from 'enzyme';

import ExternalFeedback from '../ExternalFeedback';
import styles from '../../css_modules/ExternalFeedback.module.css';

describe('<ExternalFeedback />', () => {
    it('Renders without crashing', () => {
        shallow(<ExternalFeedback />);
    });

    it('Renders <Instructions/> and <FeedbackForm/>', () => {
        const wrapper = shallow(<ExternalFeedback />);
        expect(wrapper.state().success).toEqual(false);
        expect(wrapper.find('Instructions')).toHaveLength(1);
        expect(wrapper.find('Connect(FeedbackForm)')).toHaveLength(1);
    });

    it('Renders <ExternalSuccess/> if extReviewSuccess is called', () => {
        const wrapper = shallow(<ExternalFeedback />);
        wrapper.instance().extReviewSuccess();
        expect(wrapper.state().success).toEqual(true);
        expect(wrapper.find('ExternalSuccess')).toHaveLength(1);
    });

});