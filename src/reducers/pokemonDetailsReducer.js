import { GET_POKEMON_DETAILS_STARTED, GET_POKEMON_DETAILS_FINISHED } from "../actions/actionPokemonDetails";

export const DEFAULT_DETAILS_STATE = {
    loading: false,
    error: null,
    dict: {}
}

const pokemonDetailsReducer = (state = DEFAULT_DETAILS_STATE, action) => {

    console.log(action);

    switch (action.type) {
        case GET_POKEMON_DETAILS_STARTED:
            return { ...state, error: null, loading: true };
        case GET_POKEMON_DETAILS_FINISHED:
            const { payload, success, cached } = action;
            
            let newState = { ...state, loading: false };
            if (success && !cached) {
                // get the id first
                const { id, stats, weight, height, base_experience } = payload;
                const detail = {
                    weight,
                    height,
                    base_experience,
                    stats
                };
                newState.dict['pokemon-' + id] = detail;
            }
            else if (!success) {
                // error
                newState.error = payload;
            }
            return newState;
        default:
            return state;
    }



};

export default pokemonDetailsReducer;