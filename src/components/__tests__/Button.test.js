import React from 'react';
import { shallow, mount } from 'enzyme';

import Button from '../Button';
import styles from '../../css_modules/Button.module.css';

describe('<Button', () => {
    it('Renders without crashing', () => {
        shallow(<Button />);
    });

    it('Renders the children', () => {
        const children = 'Button Text';
        const wrapper = shallow(<Button>{children}</Button>);
        expect(wrapper.text()).toEqual(children);
    });

    it('Calls a provided onClick function when clicked', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<Button onClick={onClick} />);
        wrapper.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });

    it('Renders with default class and provided classes', () => {
        const wrapper = shallow(<Button btnStyle="center roomyTopBot" />);
        expect(wrapper.hasClass(styles.default)).toEqual(true);
        expect(wrapper.hasClass(styles.center)).toEqual(true);
        expect(wrapper.hasClass(styles.roomyTopBot)).toEqual(true);
    });
});