import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BreakfastBuilder} from "./BreakfastBuilder";
import BuildControls from '../../components/Breakfast/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BreakfastBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BreakfastBuilder onFetchItems={() => {}} />);
    });

    it('should render <BuildControls /> when receiving items', () => {
        wrapper.setProps({items: {coffee: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

});