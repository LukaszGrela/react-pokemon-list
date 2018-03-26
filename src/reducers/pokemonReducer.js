import { GET_POKEMON_LIST_STARTED, GET_POKEMON_LIST_FINISHED } from "../actions/actionPokemonList";
import { parseIdFromUrl } from "../utils/utils";
import { GET_POKEMON_DETAILS_FINISHED } from "../actions/actionPokemonDetails";
import { API_GATEWAY, API_GET_POKEMON } from "../constants/api";

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
        case GET_POKEMON_LIST_FINISHED:
            const success = action.success;
            let newState = { ...state, loading: false, page: action.page };
            if (success) {
                newState.noMore = action.payload.next === null;
                newState.list = [...state.list, ...action.payload.results.map((item) => {
                    const id = parseIdFromUrl(item.url);
                    return { ...item, id };
                }
                )];
                newState.count = action.payload.count;
            } else {
                newState.error = action.payload;
            }
            return newState;
/*
        case GET_POKEMON_DETAILS_FINISHED:

            if (action.success) {
                const { id, name } = action.payload;
                const url = API_GATEWAY + API_GET_POKEMON(id);
                let insert = [];
                if (state.list.find((item) => item.id === id) === undefined) {
                    insert = [{ id, name, url }];
                }

                return { ...state, list: [...state.list, ...insert] };

            }


            return state;
            */
        default:
            return state;
    }


};
export default pokemonReducer;