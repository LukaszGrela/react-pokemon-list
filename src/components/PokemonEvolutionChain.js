import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pokemonEvolutionChainSelector } from '../selectors/pokemonEvolutionChainSelector';
import { actionGetPokemonEvolutionChain } from '../actions/actionPokemonEvolutionChain';
import { parseIdFromUrl } from '../utils/utils';
import { API_GET_SPRITE_FRONT } from '../constants/api';


import './styles/PokemonEvolutionChain.scss';
import Image from './Image';

class PokemonEvolutionChain extends React.Component {

    componentWillMount = () => {
        const { id, pullEvolutionChain } = this.props;
        pullEvolutionChain(id);
    }

    getChain = (evolves_to, initial = []) => {
        if (!evolves_to) return initial;
        // species object contains name and id (in resource url)
        const pokemon = {
            id: parseIdFromUrl(evolves_to.species.url),
            name: evolves_to.species.name
        }
        initial.push(pokemon);
        if (evolves_to.hasOwnProperty('evolves_to')) {

            // we have another link
            // note: evolves_to can have more than 1 entry! - here for simplicity I'm taking only first
            this.getChain(evolves_to.evolves_to[0], initial);
        }

        return initial;
    }

    render = () => {
        const { id, loading = true, chain, error } = this.props;

        if (!chain) return null;
        else {
            const evolution = this.getChain(chain.chain);

            if (!evolution || evolution.length === 0) return null;

            return (
                <div className='pokemon-evolution-chain'>
                    <h3>Evolution Chain</h3>
                    {loading && 'Loading...'}
                    {
                        !loading && evolution.map(({ id, name }, index, list) => {


                            const jsx = [
                                <div className='link' key={index}>
                                    <Image
                                        src={API_GET_SPRITE_FRONT(id)}
                                        fallback={API_GET_SPRITE_FRONT('default/0')}
                                        className='front' />
                                    <div className='name'>{name}</div>
                                </div>
                            ];

                            if (index < list.length - 1) {
                                jsx.push(<div className='arrow-right' key={'arrow-' + index}></div>);
                            }


                            return jsx;
                        })
                    }
                </div>
            )
        }
    }
};

PokemonEvolutionChain.propTypes = {
    id: PropTypes.number.isRequired
};

const mapStateToProps = (state, props) => {
    /* selectors evolution chain */

    const evolutionChain = pokemonEvolutionChainSelector(state.evolution.dict, props.id);
    return {
        chain: evolutionChain,
        loading: state.evolution.loading,
        error: state.evolution.error
    };
}
const mapDispatchToProps = (dispatch) => ({
    pullEvolutionChain: (id) => dispatch(actionGetPokemonEvolutionChain(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PokemonEvolutionChain);