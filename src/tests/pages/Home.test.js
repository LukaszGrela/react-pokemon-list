import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../pages/Home';
import { POKEMON_LIST_RESULTS } from '../fixtures/pokemon-list';

let wrapper,
    location,
    history,
    loading,
    error,
    noMore,
    list,
    pullMoreItems;

beforeEach(() => {
    history = { action: 'PUSH' };
    location = { state: { modal: false } };
    loading = false;
    error = null;
    noMore = false;
    list = POKEMON_LIST_RESULTS;
    pullMoreItems = jest.fn();
    wrapper = shallow(<Home
        location={location}
        history={history}
        loading={loading}
        error={error}
        noMore={noMore}
        list={list}
        pullMoreItems={pullMoreItems}
    />);
})

test('Should render Home page correctly', () => {

    expect(wrapper).toMatchSnapshot();
});
test('Should render Home page correctly for loading state', () => {
    wrapper.setProps(
        {
            loading: true
        });

    expect(wrapper).toMatchSnapshot();
});
test('Should render Home page correctly for noMore state', () => {
    wrapper.setProps(
        {
            noMore: true
        });

    expect(wrapper).toMatchSnapshot();
});