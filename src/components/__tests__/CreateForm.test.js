import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CreateForm } from '../CreateForm';
import styles from '../../css_modules/CreateForm.module.css';

describe('<CreateForm />', () => {
    const mountWithRouter = component => {
        return mount(<Router>{component}</Router>);
    }

    it('Renders without crashing', () => {
        shallow(<CreateForm />);
    });

    it('Sets question text to state', () => {
        const wrapper = shallow(<CreateForm />);
        wrapper.instance().setQuestionText('hello', 0);
        wrapper.instance().setQuestionText('world', 1);
        expect(wrapper.state().questions[0]).toEqual('hello');
        expect(wrapper.state().questions[1]).toEqual('world');
    });

    it('Deletes questions', () => {
        const wrapper = shallow(<CreateForm />);
        wrapper.instance().setQuestionText('hello', 1);
        wrapper.instance().deleteQuestion(1);
        expect(wrapper.state().questions).toEqual(['', '']);
    });

    it('Adds questions', () => {
        const wrapper = shallow(<CreateForm />);
        wrapper.instance().addQuestion();
        expect(wrapper.state().questions.length).toEqual(4);
    });

    it('Handles form submission errors', () => {
        const wrapperWithRouter = mountWithRouter(<CreateForm />);
        const wrapper = wrapperWithRouter.find(CreateForm);
        wrapper.instance().handleFormSubmit({ preventDefault: () => null });
        expect(wrapper.state().nameErr).toEqual('Form Name is required');
        expect(wrapper.state().projectUrlErr).toEqual('Project URL is required');
        expect(wrapper.state().overviewErr).toEqual('Reviewer Instructions are required');
        expect(wrapper.state().questionsErr).toEqual(['Blank questions not allowed', 'Blank questions not allowed', 'Blank questions not allowed']);
    });

    it('Dispatches setUser and showPopup on successful submission', () => {
        const user = {};

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => {
                    return Promise.resolve(user);
                }
            })
        );
        const dispatch = jest.fn();
        const wrapperWithRouter = mountWithRouter(<CreateForm dispatch={dispatch} />);
        const wrapper = wrapperWithRouter.find(CreateForm);
        return wrapper.instance().submitToServer()
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(wrapper.state().submitSuccess).toEqual(true);
            });
    });

    it('Redirects on successful submisssion', () => {
        const wrapper = shallow(<CreateForm />);
        wrapper.setState({ submitSuccess: true });
        expect(wrapper.find('Redirect')).toHaveLength(1);
    });

    it('Renders disabled button if submitting', () => {
        const wrapper = shallow(<CreateForm />);
        wrapper.setState({ isSubmitting: true });
        expect(wrapper.find('[type="submit"]').hasClass('disabled'));
    });

});