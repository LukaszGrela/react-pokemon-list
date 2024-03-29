export const API_GATEWAY = 'https://pokeapi.co/api/v2/';

export const API_LIST_POKEMON = 'pokemon/';

export const getEvolutionChain = (id: string): string =>
  `${API_GATEWAY}evolution-chain/${id}`;

export const API_GET_SPRITE_FRONT = (id: string): string =>
  `./static/pokemon/${id}.png`;
export const API_GET_SPRITE_BACK = (id: string): string =>
  `./static/pokemon/back/${id}.png`;

export type TPagination = { limit: number; offset?: number };
export const PAGINATION = (page = 1, limit = 20): TPagination => {
  const params: TPagination = {
    limit,
  };
  const offset = (Math.max(1, page) - 1) * limit;
  if (offset > 0) params.offset = offset;

  return params;
};

export * from './utils';
