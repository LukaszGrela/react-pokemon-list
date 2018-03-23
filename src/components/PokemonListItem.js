import React from 'react';
import PropTypes from 'prop-types';
import { API_GET_SPRITE_FRONT } from '../constants/api';
import Image from './Image';


class PokemonListItem extends React.PureComponent {
    render = () => {
        const { id, name, handleClick } = this.props;
        console.log("Item", id, "redrawn.");
        return (
            <li
                className='pokemon-item'
                onClick={() => {
                    handleClick && handleClick(id);
                }}
            >
                <Image
                    src={API_GET_SPRITE_FRONT(id)}
                    fallback={API_GET_SPRITE_FRONT('default/0')}
                    className='pokemon-image'
                    alt={`Image of ${name} pokemon.`} />
                <div className='pokemon-name'>{name}</div>
            </li>
        )
    }
}
PokemonListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    handleClick: PropTypes.func
};

export default PokemonListItem;