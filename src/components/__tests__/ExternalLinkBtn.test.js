import React from 'react';
import { shallow } from 'enzyme';

import ExternalLinkBtn from '../ExternalLinkBtn';

describe('<ExternalLinkBtn />', () => {
    it('Renders without crashing', () => {
        shallow(<ExternalLinkBtn />);
    });

    it('Renders children', () => {
        const childText = <p>text</p>;
        const wrapper = shallow(<ExternalLinkBtn>{childText}</ExternalLinkBtn>);
        expect(wrapper.children('p').text()).toEqual('text');
    });

    it('Sets href from props.href', () => {
        const href = '#';
        const wrapper = shallow(<ExternalLinkBtn href={href} />);
        expect(wrapper.find({ href: '#' })).toHaveLength(1);
    });

});