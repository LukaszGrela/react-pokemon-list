import React from 'react';
import { connect } from 'react-redux';
import { actionGetPokemonList } from '../actions/actionPokemonList';
import PokemonList from '../components/PokemonList';
import Spinner from '../components/Spinner';

import './styles/Home.scss';

class Home extends React.Component {

    handleListItemClick = (id) => {
        console.log("Clicked on ", id);
    }

    handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            // reached the bottom
            this.detachScrollListener();//stop listening
            this.props.pullMoreItems();
        }
    }

    detachScrollListener = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }
    attachScrollListener = () => {
        this.detachScrollListener();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.list.length > 0 //dont for initial load
            && this.props.loading === true //is loading
            && this.props.loading !== prevProps.loading //was just switched to loading
        ) {
            document.getElementsByClassName('loading-spinner')[0].scrollIntoView();
        }
        if (this.props.noMore !== prevProps.noMore && this.props.noMore) {
            this.detachScrollListener();//no more pulling
        }
        if (!this.props.noMore && this.props.loading !== prevProps.loading && this.props.loading === false) {
            this.attachScrollListener();//reattach listener
        }
    }
    componentWillMount = () => {
        this.attachScrollListener();
    }
    componentWillUnmount = () => {
        this.detachScrollListener();
    }
    render = () => {
        const { list, loading, noMore } = this.props;
        return (
            <article className='home'>
                <PokemonList list={list} handleClick={this.handleListItemClick}/>
                {loading && <Spinner />}
                {noMore &&
                    <div className='no-more'>
                        <p>-- The End --</p>
                    </div>
                }
            </article>
        );
    }
};

const mapStateToProps = (state, props) => ({
    loading: state.pokemons.loading,
    error: state.pokemons.error,
    noMore: state.pokemons.noMore,
    list: state.pokemons.list
});
const mapDispatchTopProps = (dispatch) => ({
    pullMoreItems: () => dispatch(actionGetPokemonList())
})
export default connect(mapStateToProps, mapDispatchTopProps)(Home);