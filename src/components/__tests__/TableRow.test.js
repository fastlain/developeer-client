import React from 'react';
import { shallow } from 'enzyme';

import TableRow from '../TableRow';

describe('<TableRow />', () => {
    const cells = ['1', '2', '3'];
    const rowStyle = 'even';

    it('Renders without crashing', () => {
        shallow(<TableRow cells={cells} rowStyle={rowStyle} />);
    });

    it('Renders with the provided rowStyle class', () => {
        const wrapper = shallow(<TableRow cells={cells} rowStyle={rowStyle} />);
        expect(wrapper.hasClass(rowStyle)).toEqual(true);
    });

    it('Renders the cells', () => {
        const wrapper = shallow(<TableRow cells={cells} rowStyle={rowStyle} />);
        expect(wrapper.find('.cell')).toHaveLength(cells.length);
    });

});