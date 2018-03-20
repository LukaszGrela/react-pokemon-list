import React from 'react';
import { connect } from 'react-redux';

import PokemonDetails from '../components/PokemonDetails';

import './styles/PokemonDetailsPage.scss';

class PokemonDetailsPage extends React.Component {

    render = () => {
        // const { list, loading, noMore } = this.props;
        return (
            <article className='pokemon-details-page'>
                <PokemonDetails />
            </article>
        );
    }
};

const mapStateToProps = (state, props) => ({
    // loading: state.pokemons.loading,
    // error: state.pokemons.error,
    // noMore: state.pokemons.noMore,
    // list: state.pokemons.list
});
const mapDispatchTopProps = (dispatch) => ({
    // pullMoreItems: () => dispatch(actionGetPokemonList())
})
export default connect(mapStateToProps, mapDispatchTopProps)(PokemonDetailsPage);