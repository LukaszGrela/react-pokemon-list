// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_GATEWAY, API_LIST_POKEMON } from '../../api'
import { IPokemonDetail } from '../model/pokemon'

// Define a service using a base URL and expected endpoints
export const pokemonDetails = createApi({
  reducerPath: 'pokemonDetails',
  baseQuery: fetchBaseQuery({ baseUrl: API_GATEWAY }),
  endpoints: (builder) => ({
    getPokemonByNameOrId: builder.query<IPokemonDetail, string>({
      query: (nameOrId) => `${API_LIST_POKEMON}${nameOrId}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameOrIdQuery } = pokemonDetails;
export type TPokemonDetailsReducer = ReturnType<typeof pokemonDetails.reducer>;