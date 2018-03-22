import {
    GET_POKEMON_EVOLUTION_CHAIN_STARTED,
    GET_POKEMON_EVOLUTION_CHAIN_FINISHED
} from "../actions/actionPokemonEvolutionChain";


export const DEFAULT_EVOLUTION_CHAIN_STATE = {
    loading: false,
    error: null,
    dict: {}
};

const pokemonEvolutionReducer = (state = DEFAULT_EVOLUTION_CHAIN_STATE, action) => {
    switch (action.type) {
        case GET_POKEMON_EVOLUTION_CHAIN_STARTED:
            return { ...state, error: null, loading: true };
            break;
        case GET_POKEMON_EVOLUTION_CHAIN_FINISHED:
            const { payload, success, cached } = action;
            let newState = { ...state, loading: false };
            if (success && !cached) {
                const { id } = payload;
                newState.dict['pokemon-' + id] = payload;
            } else if (!success) {
                // error
                newState.error = payload;
            }
            return newState;
            break;
        default:
            return state;
            break;
    }
};
export default pokemonEvolutionReducer;