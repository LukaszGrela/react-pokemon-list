import axios from 'axios';
import { API_GATEWAY, API_GET_POKEMON, PAGINATION, API_LIST_POKEMON } from '../constants/api';

export const GET_POKEMON_LIST_STARTED = 'gd:GET_POKEMON_LIST_STARTED';
export const actionGetPokemonListStarted = () => ({
    type: GET_POKEMON_LIST_STARTED
});


export const actionGetPokemonList = () => {
    return (dispatch, getState) => {
        dispatch(actionGetPokemonListStarted());

        const { pokemons } = getState();
        const { page } = pokemons;

        return axios.get(API_GATEWAY + API_LIST_POKEMON, { params: PAGINATION(page) })
            .then(response => {
                dispatch(actionGetPokemonListFinished(page + 1, response.data, true));
            })
            .catch(error => {
                const { response, request, message, config } = error;
                dispatch(actionGetPokemonListFinished(page, error, false))
            });
    }
};

export const GET_POKEMON_LIST_FINISHED = 'gd:GET_POKEMON_LIST_FINISHED';
export const actionGetPokemonListFinished = (page, payload, success) => ({
    type: GET_POKEMON_LIST_FINISHED,
    success,
    payload,
    page
});