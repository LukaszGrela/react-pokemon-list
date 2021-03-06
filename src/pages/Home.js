import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { actionGetPokemonList } from '../actions/actionPokemonList';
import PokemonList from '../components/PokemonList';
import Spinner from '../components/Spinner';
import LoadMore from '../components/LoadMore';
import Panel from '../components/Panel';
import PokemonDetails from '../components/PokemonDetails';

import './styles/Home.scss';

export class Home extends React.Component {
    state = {
        showLoadMore: false
    }

    previousLocation = this.props.location;

    handleLoadMore = () => {
        this.props.pullMoreItems().then(() => {
            this.shouldShowMore();
        });
    }


    handleListItemClick = (id) => {
        this.props.history.push(`/pokemon/${id}`, { modal: true });

    }

    handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            // reached the bottom
            this.detachScrollListener();//stop listening
            this.shouldShowMore();
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

    componentWillUpdate = (nextProps) => {
        const { location } = this.props;
        // set previousLocation if props.location is not modal
        if (
            nextProps.history.action !== "POP" &&
            (!location.state || !location.state.modal)
        ) {
            this.previousLocation = this.props.location;
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.list.length > 0 //dont for initial load
            && this.props.loading === true //is loading
            && this.props.loading !== prevProps.loading //was just switched to loading
        ) {
            const spinner = document.getElementsByClassName('loading-spinner');
            if (spinner && spinner.length > 0) spinner[0].scrollIntoView();
        }
        if (this.props.noMore !== prevProps.noMore && this.props.noMore) {
            this.detachScrollListener();//no more pulling
        }
        if (!this.props.noMore && this.props.loading !== prevProps.loading && this.props.loading === false) {
            this.attachScrollListener();//reattach listener
        }
    }

    shouldShowMore = () => {
        this.setState(_ => ({
            showLoadMore: (document.body.scrollHeight <= window.innerHeight)
        }));
    }

    componentDidMount = () => {
        this.shouldShowMore();
    }
    componentWillMount = () => {
        this.attachScrollListener();
    }
    componentWillUnmount = () => {
        this.detachScrollListener();
    }
    render = () => {
        const { showLoadMore = false } = this.state;
        const { location, list, loading, noMore } = this.props;
        const isModal = !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location
        ); // not initial render
        return (
            <article className='home-page'>
                <header>Pokémon List</header>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path='/' component={
                        () => {
                            // TODO: How to avoid calling this when popup is opened and location changed
                            return (
                                <PokemonList list={list} handleClick={this.handleListItemClick} />
                            )
                        }
                    } />
                </Switch>
                {loading && <Spinner />}
                {!loading && showLoadMore && <LoadMore clickHandler={this.handleLoadMore} />}
                {noMore &&
                    <div className='no-more'>
                        <p>-- The End --</p>
                    </div>
                }
                <Route exact path='/pokemon/:id' component={
                    ({ history, match }, b) => {
                        return (
                            <Panel handlePanelDismiss={_ => {
                                history.replace('/');
                            }} >
                                <PokemonDetails
                                    id={parseInt(match.params.id, 10)}
                                    history={history} />
                            </Panel>
                        );
                    }
                } />
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