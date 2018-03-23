import React from 'react';
import PropTypes from 'prop-types';
import { API_GET_SPRITE_FRONT } from '../constants/api';

import './styles/PokemonList.scss';
import Image from './Image';
import PokemonListItem from './PokemonListItem';

export default class PokemonList extends React.Component {
    render = () => {
        const { list, handleClick } = this.props;
        return (
            <ul className={'pokemon-list' + (handleClick ? ' interactive' : '')}>
                {
                    list.map(({ url, name, id }, index) => <PokemonListItem
                        key={index}
                        id={id}
                        name={name}
                        handleClick={handleClick} />)
                }
            </ul>)

    }
}

PokemonList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleClick: PropTypes.func
}