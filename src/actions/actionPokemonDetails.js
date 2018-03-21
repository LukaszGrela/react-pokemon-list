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
        const { details: store } = getState();
        const { details={} } = store;
        /* selector to check if state already have it */
        dispatch(actionGetPokemonDetailsStarted(id));
        if (details.hasOwnProperty(id.toString()) && details[id.toString()]) {
            //cached
            return new Promise((resolve, reject) => {
                resolve(details[id.toString()]);
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