import React from 'react';
import {shallow} from 'enzyme';
import PokemonList from '../../components/PokemonList';
// import {POKEMON_3 } from '../fixtures/pokemon-list.js';


test('Should render component correctly', () => {
    const wrapper = shallow(<PokemonList 
        list={
            [
                { "url": "https:\/\/pokeapi.co\/api\/v2\/pokemon\/21\/", "name": "spearow", id:21 }
            ]
        }
        />);

    expect(wrapper).toMatchSnapshot();
})