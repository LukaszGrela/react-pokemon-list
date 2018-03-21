import axios from "axios";
import { API_GATEWAY, API_GET_POKEMON } from "../constants/api";

export const GET_POKEMON_DETAILS_STARTED = 'gd:GET_POKEMON_DETAILS_STARTED';
export const actionGetPokemonDetailsStarted = (id) => ({
    type: GET_POKEMON_DETAILS_STARTED,
    id
});
export const GET_POKEMON_DETAILS_FINISHED = 'gd:GET_POKEMON_DETAILS_FINISHED';
export const actionGetPokemonDetailsFinished = (payload, success, cached = false) => ({
    type: GET_POKEMON_DETAILS_FINISHED,
    payload,
    success,
    cached
});
export const actionGetPokemonDetails = (id) => {
    return (dispatch, getState) => {
        const { details } = getState();
        const { dict = {} } = details;
        /* selector to check if state already have it */
        dispatch(actionGetPokemonDetailsStarted(id));
        if (dict.hasOwnProperty('pokemon-' + id) && dict['pokemon-' + id]) {
            //cached
            return new Promise((resolve, reject) => {
                resolve(dict['pokemon-' + id]);
            }).then((payload) => {
                dispatch(actionGetPokemonDetailsFinished(payload, true, true))
            })
        } else {
            // axios
            return axios.get(API_GATEWAY + API_GET_POKEMON(id))
                .then(response => {
                    dispatch(actionGetPokemonDetailsFinished(response.data, true));
                })
                .catch(error => {
                    const { response, request, message, config } = error;
                    dispatch(actionGetPokemonDetailsFinished(error, false))
                });
        }

    }
}