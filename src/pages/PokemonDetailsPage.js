import React from 'react';
import { connect } from 'react-redux';

import PokemonDetails from '../components/PokemonDetails';

import './styles/PokemonDetailsPage.scss';
import { actionGetPokemonDetails } from '../actions/actionPokemonDetails';
import { pokemonListSelector } from '../selectors/pokemonListSelector';

class PokemonDetailsPage extends React.Component {

    render = () => {
        const { id, name, history, pullPokemonDetails } = this.props;
        return (
            <article className='pokemon-details-page'>
                <header>{name}</header>
                <PokemonDetails
                    id={parseInt(id, 10)}
                    history={history}
                    handleShowPokemon={pullPokemonDetails}
                />
            </article>
        );
    }
};

const mapStateToProps = (state, props) => {
    const { match } = props;
    const id = parseInt(match.params.id, 10);
    const pokemon = pokemonListSelector(state.pokemons.list, id);
    const { name } = pokemon;
    return {
        id,
        name
        // loading: state.pokemons.loading,
        // error: state.pokemons.error,
        // noMore: state.pokemons.noMore,
        // list: state.pokemons.list
    }
};
const mapDispatchTopProps = (dispatch, { history }) => ({
    /* action to pull pokemon data  */
    pullPokemonDetails: (id) => {
        history.push(`/pokemon/${id}`);
        return dispatch(actionGetPokemonDetails(id));
    }
})
export default connect(mapStateToProps, mapDispatchTopProps)(PokemonDetailsPage);