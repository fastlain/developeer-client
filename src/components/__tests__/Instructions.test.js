import React from 'react';
import { shallow, mount } from 'enzyme';

import Instructions from '../Instructions';
import styles from '../../css_modules/Instructions.module.css';

describe('<Instructions />', () => {
    it('Renders without crashing', () => {
        shallow(<Instructions />);
    });

    it('Renders a title if provided', () => {
        const wrapper = shallow(<Instructions title="title" />);
        expect(wrapper.find('h3').text()).toEqual('title');
    });

    it('Renders a list of instructions', () => {
        const list = ['Item 1', 'Item2', 'Item 3'];
        const wrapper = shallow(<Instructions list={list} />);
        expect(wrapper.find('li')).toHaveLength(3);
    });

});