import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {ShopBuilder} from "./ShopBuilder";
import BuildControls from '../../components/Shopping/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<ShopBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<ShopBuilder onFetchItems={() => {}} />);
    });

    it('should render <BuildControls /> when receiving items', () => {
        wrapper.setProps({items: {coffee: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

});
