export const API_GATEWAY = 'https://pokeapi.co/api/v2/';

export const API_LIST_POKEMON = 'pokemon/';

export const API_GET_POKEMON = (id) => API_LIST_POKEMON + id;

export const API_GET_SPRITE_FRONT = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const PAGINATION = (page=1, limit = 20) => {
    let params = {
        limit
    };
    if(page < 1) page = 1;
    let offset = (page-1) * limit;
    if (offset > 0) params['offset'] = offset;

    return params;
};