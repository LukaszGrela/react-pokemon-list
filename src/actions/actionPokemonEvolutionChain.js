import Axios from "axios";
import { API_GATEWAY, API_GET_EVOLUTION_CHAIN } from "../constants/api";

export const GET_POKEMON_EVOLUTION_CHAIN_STARTED = 'gd:GET_POKEMON_EVOLUTION_CHAIN_STARTED';
export const actionGetPokemonEvolutionChainStarted = (id) => ({
    type: GET_POKEMON_EVOLUTION_CHAIN_STARTED,
    id
});
export const GET_POKEMON_EVOLUTION_CHAIN_FINISHED = 'gd:GET_POKEMON_EVOLUTION_CHAIN_FINISHED';
export const actionGetPokemonEvolutionChainFinished = (payload, success, cached = false) => ({
    type: GET_POKEMON_EVOLUTION_CHAIN_FINISHED,
    payload,
    success,
    cached
});

export const actionGetPokemonEvolutionChain = (id) => {
    return (dispatch, getState) => {
        const { evolution } = getState();
        const { dict } = evolution;
        const key = `pokemon-${id}`;
        dispatch(actionGetPokemonEvolutionChainStarted(id));

        if (dict && dict.hasOwnProperty(key) && dict[key]) {
            return new Promise((resolve, reject) => {
                resolve(dict[key]);
            }).then(payload => {
                //
                dispatch(actionGetPokemonEvolutionChainFinished(payload, true, true));
            });
        }
        else {
            // make a call
            return Axios.get(API_GATEWAY + API_GET_EVOLUTION_CHAIN(id))
                .then(response => {
                    dispatch(actionGetPokemonEvolutionChainFinished(response.data, true));
                })
                .catch(error => {
                    const { response, request, message, config } = error;
                    dispatch(actionGetPokemonEvolutionChainFinished(error, false))

                });
        }
    }
}