import React from 'react';
import { connect } from 'react-redux';
import { actionGetPokemonList } from '../actions/actionPokemonList';
import PokemonList from '../components/PokemonList';


class Home extends React.Component {
    render = () => {
        return (
            <article>
                <PokemonList list={this.props.list} />
                <button onClick={() => {
                    this.props.pullMoreItems();
                }}>Pull More Items</button>
            </article>
        );
    }
};

const mapStateToProps = (state, props) => ({
    list: state.pokemons.list
});
const mapDispatchTopProps = (dispatch) => ({
    pullMoreItems: () => dispatch(actionGetPokemonList())
})
export default connect(mapStateToProps, mapDispatchTopProps)(Home);