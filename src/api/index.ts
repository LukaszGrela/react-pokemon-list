export const API_GATEWAY = 'https://pokeapi.co/api/v2/';

export const API_LIST_POKEMON = 'pokemon/';

export const getEvolutionChain = (id: string): string =>
  `${API_GATEWAY}evolution-chain/${id}`;

export const API_GET_SPRITE_FRONT = (id: string): string =>
  `./static/pokemon/${id}.png`;
export const API_GET_SPRITE_BACK = (id: string): string =>
  `./static/pokemon/back/${id}.png`;

type TPagination = { limit: number; offset?: number };
export const PAGINATION = (page = 1, limit = 20): TPagination => {
  let params: TPagination = {
    limit,
  };
  if (page < 1) page = 1;
  let offset = (page - 1) * limit;
  if (offset > 0) params['offset'] = offset;

  return params;
};

export const getPokemonList = (page = 1, limit = 20): string => {
  const pagination: TPagination = PAGINATION(page, limit);
  const params = (Object.keys(pagination) as (keyof TPagination)[]).reduce(
    (acc, key: keyof TPagination): string => {
      let output = `${acc}${acc === '' ? '?' : '&'}${key}=${pagination[key]}`;
      return output;
    },
    ''
  );
  return `${API_GATEWAY}${API_LIST_POKEMON}${params}`;
};

export * from './utils';
