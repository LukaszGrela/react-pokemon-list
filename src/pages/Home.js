import React from 'react';
import { connect } from 'react-redux';
import { actionGetPokemonList } from '../actions/actionPokemonList';
import PokemonList from '../components/PokemonList';
import Spinner from '../components/Spinner';

import './styles/Home.scss';

class Home extends React.Component {
    render = () => {
        const {list, loading} = this.props;
        return (
            <article className='home'>
                <PokemonList list={list} />
                {loading && <Spinner />}
            </article>
        );
    }
};

const mapStateToProps = (state, props) => ({
    loading:state.pokemons.loading,
    error: state.pokemons.error,
    noMore: state.pokemons.noMore,
    list: state.pokemons.list
});
const mapDispatchTopProps = (dispatch) => ({
    pullMoreItems: () => dispatch(actionGetPokemonList())
})
export default connect(mapStateToProps, mapDispatchTopProps)(Home);