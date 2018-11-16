import React from 'react';
import { shallow } from 'enzyme';

import Question from '../Question';

describe('<Question />', () => {
    it('Renders without crashing', () => {
        shallow(<Question />);
    });

    it('Renders elements with the provided props.order', () => {
        const order = 1;
        const wrapper = shallow(<Question order={order} />);
        expect(wrapper.find('legend').text()).toEqual(`Question ${order + 1}:`);
        expect(wrapper.find(`[htmlFor='question${order}']`)).toHaveLength(1);
        expect(wrapper.find(`[name='question${order}']`)).toHaveLength(1);
    });

    it('Calls props.deleteQuestion on Button click with correct order', () => {
        const order = 1;
        const deleteQuestion = jest.fn();
        const wrapper = shallow(<Question order={order} deleteQuestion={deleteQuestion} />);
        wrapper.find('Button').simulate('click');
        expect(deleteQuestion).toHaveBeenCalledWith(order);
    });

    it('Renders the error message', () => {
        const error = 'Error Message';
        const wrapper = shallow(<Question error={error} />);
        expect(wrapper.find('Error').prop('message')).toEqual(error)
    });

});