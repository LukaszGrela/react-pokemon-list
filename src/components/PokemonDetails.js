import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles/PokemonDetails.scss';
import {
    API_GET_SPRITE_FRONT,
    API_GET_SPRITE_BACK
} from '../constants/api';
import Spinner from './Spinner';
import PokemonStats from './PokemonStats';
import { actionGetPokemonDetails } from '../actions/actionPokemonDetails';
import { pokemonListSelector } from '../selectors/pokemonListSelector';
import { pokemonDetailSelector } from '../selectors/pokemonDetailSelector';
import Image from './Image';
import PokemonEvolutionChainConnected from './PokemonEvolutionChainConnected';

class PokemonDetails extends React.Component {

    handleShowPokemon = (id) => {
        const { history } = this.props;
        if (!this.props.handleShowPokemon) {
            history.push(`/pokemon/${id}`);
        } else {
            this.props.handleShowPokemon(id);
        }
    }

    componentWillMount = () => {
        const { id, pullPokemonDetails } = this.props;
        pullPokemonDetails(id);
    }

    render = () => {
        const { id, name, stats = [], height, weight, loading } = this.props;

        return (
            <div className={'pokemon-details' + (loading ? ' loading' : '')}>
                {
                    (loading) ? <Spinner />
                        :
                        <div className='pokemon-details-wrapper'>
                            <div className='pokemon-image column-left'>
                                <Image
                                    src={API_GET_SPRITE_FRONT(id)}
                                    fallback={API_GET_SPRITE_FRONT('default/0')}
                                    className='front'
                                    alt={`Image of ${name} pokemon.`} />
                                <Image
                                    src={API_GET_SPRITE_BACK(id)}
                                    fallback={API_GET_SPRITE_FRONT('default/0')}
                                    className='back'
                                    alt={`Image of the back of the ${name} pokemon.`} />
                            </div>
                            <div className='column-right'>
                                <div className='pokemon-name'>{name}</div>
                                <div className='pokemon-weight'><span className='label'>Weight: </span><span className='value'>{(weight / 10) + 'kg'}</span></div>
                                <div className='pokemon-height'><span className='label'>Height: </span><span className='value'>{(height / 10) + 'm'}</span></div>
                                <PokemonStats stats={stats} />
                            </div>
                            <PokemonEvolutionChainConnected id={id}
                                /*handleShowPokemon={this.handleShowPokemon}*/ />
                        </div>
                }
            </div>
        );
    }
}

PokemonDetails.propTypes = {
    id: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
    handleShowPokemon: PropTypes.func
};

const mapStateToProps = (state, props) => {
    /* selectors pokemon list, pokemon details */
    const pokemon = pokemonListSelector(state.pokemons.list, props.id);
    const details = pokemonDetailSelector(state.details.dict, props.id);

    const loaded = !state.pokemons.loading && !state.details.loading;
    return {
        loading: !loaded,
        name: !loaded || !pokemon ? '' : pokemon.name,
        ...details
    }
};
const mapDispatchToProps = (dispatch) => ({
    /* action to pull pokemon data  */
    pullPokemonDetails: (id) => dispatch(actionGetPokemonDetails(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetails);
