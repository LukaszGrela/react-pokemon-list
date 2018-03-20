import React from 'react';
import PropTypes from 'prop-types';
import { API_GET_SPRITE_FRONT } from '../constants/api';

import './styles/PokemonList.scss';

export default class PokemonList extends React.Component {
    render = () => {
        const { list, handleClick } = this.props;
        return (
            <ul className={'pokemon-list' + (handleClick ? ' interactive' : '')}>
                {
                    list.map(({ url, name, id }, index) => <li key={index}
                        onClick={() => {
                            handleClick && handleClick(id);
                        }}
                        className='pokemon-item'>
                        <img src={API_GET_SPRITE_FRONT(id)} className='pokemon-image'
                            onError={(e) => {
                                e.target.src = API_GET_SPRITE_FRONT('default/0');
                            }} />
                        <div className='pokemon-name'>{name}</div>
                    </li>)
                }
            </ul>)

    }
}

PokemonList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleClick: PropTypes.func
}