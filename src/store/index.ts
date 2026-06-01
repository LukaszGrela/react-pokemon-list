import { configureStore } from '@reduxjs/toolkit';
import { pokemonDetails } from './services/pokemon-details';
import { pokemonsList } from './services/pokemons-list';
import type { TStore } from './types';

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonsList.reducerPath]: pokemonsList.reducer,
    [pokemonDetails.reducerPath]: pokemonDetails.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      pokemonsList.middleware,
      pokemonDetails.middleware
    ),
});

export default store;

// helper to get typed store
export const getStore = (): TStore => store;
