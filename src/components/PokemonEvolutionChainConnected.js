import React from 'react';
import { connect } from 'react-redux';
import PokemonEvolutionChain from './PokemonEvolutionChain';
import { pokemonEvolutionChainSelector } from '../selectors/pokemonEvolutionChainSelector';
import { actionGetPokemonEvolutionChain } from '../actions/actionPokemonEvolutionChain';

const mapStateToProps = (state, props) => {
    /* selectors evolution chain */
    return {
        chain: pokemonEvolutionChainSelector(state.evolution.dict, props.id),
        loading: state.evolution.loading,
        error: state.evolution.error
    };
};
const mapDispatchToProps = (dispatch) => ({
    pullEvolutionChain: (id) => dispatch(actionGetPokemonEvolutionChain(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonEvolutionChain);