import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_GATEWAY, API_LIST_POKEMON, TPagination } from '../../api'
import { IAPIResourceList } from '../model/pokemon-list';

export const pokemonsList = createApi({
  reducerPath: 'pokemonsList',
  baseQuery: fetchBaseQuery({ baseUrl: API_GATEWAY }),
  endpoints: (builder) => ({
    getPokemonsList: builder.query<IAPIResourceList, TPagination>({
      query: (pagination) => {
        const params = (Object.keys(pagination) as (keyof TPagination)[]).reduce(
          (acc, key: keyof TPagination): string => {
            let output = `${acc}${acc === '' ? '?' : '&'}${key}=${pagination[key]}`;
            return output;
          },
          ''
        );
        return `${API_LIST_POKEMON}${params}`;
      }
    })
  })
})

export const { useGetPokemonsListQuery } = pokemonsList;
export type TPokemonsListReducer = ReturnType<typeof pokemonsList.reducer>;