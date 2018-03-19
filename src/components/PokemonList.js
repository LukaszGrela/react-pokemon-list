import React from 'react';
import PropTypes from 'prop-types';
import { API_GET_SPRITE_FRONT } from '../constants/api';

import './styles/PokemonList.scss';

export default class PokemonList extends React.Component {
    render = () => {
        return (
            <ul className='list'>
            {
                this.props.list.map(({ url, name, id }, index) => <li key={index}>
                    <img src={API_GET_SPRITE_FRONT(id)} />
                    <div className='name'>{name}</div>
                </li>)
            }
        </ul>)
    
    }
}

PokemonList.propTypes = {
    list:PropTypes.arrayOf(PropTypes.object).isRequired
}