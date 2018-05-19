import React from 'react';
import PropTypes from 'prop-types';
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
    renderChain = (evolution) => {
        const { id, loading = true, chain, error, handleShowPokemon } = this.props;
        
        return evolution.map(({ id: pid, name }, index, list) => {


            const jsx = [
                <div className={'link' + (handleShowPokemon && id !== pid ? ' interactive' : '')} key={pid}
                    onClick={id !== pid ?
                        () => {
                            handleShowPokemon && handleShowPokemon(pid)
                        }
                        : null}>
                    <Image
                        src={API_GET_SPRITE_FRONT(pid)}
                        fallback={API_GET_SPRITE_FRONT('default/0')}
                        className='front'
                        alt={`Image of ${name} pokemon.`} />
                    <div className='name'>{name}</div>
                </div>
            ];

            if (index < list.length - 1) {
                jsx.push(<div className='arrow-right' key={'arrow-' + index}></div>);
            }


            return jsx;
        });
    }

    render = () => {
        const { loading = true, chain } = this.props;

        if (!chain) return null;
        else {
            const evolution = this.getChain(chain.chain);

            if (!evolution || evolution.length === 0) return null;

            return (
                <div className='pokemon-evolution-chain'>
                    <h3>Evolution Chain</h3>
                    {loading && 'Loading...'}
                    {
                        !loading && this.renderChain(evolution)
                    }
                </div>
            )
        }
    }
};

PokemonEvolutionChain.propTypes = {
    id: PropTypes.number.isRequired,
    handleShowPokemon: PropTypes.func,
    chain: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.object
};

export default PokemonEvolutionChain;