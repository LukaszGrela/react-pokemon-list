import { GET_POKEMON_LIST_STARTED, GET_POKEMON_LIST_FINISHED } from "../actions/actionPokemonList";

export const DEFAULT_POKEMONS_STATE = {
    count: 0,
    page: 1,
    list: [],
    error: null,
    loading: false,
    noMore: false
}
const pokemonReducer = (state = DEFAULT_POKEMONS_STATE, action) => {

    switch (action.type) {
        case GET_POKEMON_LIST_STARTED:
            return { ...state, error: null, loading: true };
            break;
        case GET_POKEMON_LIST_FINISHED:
            const success = action.success;
            let newState = { ...state, loading: false, page: action.page };
            if (success) {
                newState.noMore = action.payload.next === null;
                newState.list = [...state.list, ...action.payload.results];
                newState.count = action.payload.count;
            } else {
                newState.error = action.payload;
            }
            return newState;
            break;
        default:
            break;
    }


    return state;
};
export default pokemonReducer;