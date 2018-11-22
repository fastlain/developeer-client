import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { FormSummary } from '../FormSummary';

describe('<FormSummary />', () => {
    const mountWithRouter = component => {
        return mount(<Router>{component}</Router>);
    }

    it('Renders without crashing', () => {
        shallow(<FormSummary />);
    });

    it('Clears warning if credits greater than 0', () => {
        const wrapper = shallow(<FormSummary />);
        wrapper.setState({ showWarning: true });
        wrapper.setProps({ credit: 1 });
        expect(wrapper.state().showWarning).toEqual(false);
    });

    it('Dispatches on clicking `+` button', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<FormSummary dispatch={dispatch} requests={5} />);

        wrapper.find('[btnStyle="square default lt"]').simulate('click');
        expect(dispatch).toHaveBeenCalled();
    });

    it('Dispatches on clicking `-` button with credits', () => {
        const dispatch = jest.fn();
        const wrapper = shallow(<FormSummary dispatch={dispatch} credit={5} />);

        wrapper.find('[btnStyle="square lt"]').simulate('click');
        expect(dispatch).toHaveBeenCalled();
    });

    it('Sets warning on clicking `-` button without credits', () => {
        const wrapper = shallow(<FormSummary credit={0} />);
        wrapper.find('[btnStyle="square lt"]').simulate('click');
        expect(wrapper.state().showWarning).toEqual(true);
    });

    it('Toggles expanded on clicking formNameWrapper', () => {
        const wrapper = shallow(<FormSummary credit={0} />);
        wrapper.find('[btnStyle="background"]').simulate('click');
        expect(wrapper.state().expanded).toEqual(true);
    });

    it('Dispatches popup on clicking copy url', () => {
        const dispatch = jest.fn();
        global.document.execCommand = jest.fn();

        const wrapper = mountWithRouter(<FormSummary dispatch={dispatch} />);

        wrapper.find('[btnStyle="text"]').simulate('click');
        expect(dispatch).toHaveBeenCalled();
        expect(global.document.execCommand).toHaveBeenCalled();
    });

});