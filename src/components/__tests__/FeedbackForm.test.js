import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { FeedbackForm } from '../FeedbackForm';
import styles from '../../css_modules/FeedbackForm.module.css';

describe('<FeedbackForm />', () => {
    const mountWithRouter = component => {
        return mount(<Router>{component}</Router>);
    }

    const matchId = {
        params: {
            id: 'id'
        }
    }

    const testQuestions = ['1', '2', '3'];

    const testForm = {
        name: 'testform',
        overview: 'overview',
        versions: [{
            questions: testQuestions
        }]
    };

    it('Renders without crashing', () => {
        shallow(<FeedbackForm match={matchId} />);
    });

    // NOTE: have not tested beyond smoke test:
    // have not been able to successfully mock the getForm function so that 
    // forms and version are set on component mounting.
    // setting state also did not cause anything to render that could then
    // be tested

});