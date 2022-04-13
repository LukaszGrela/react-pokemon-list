import { configureStore } from '@reduxjs/toolkit'
import { rootReducer, createReduxHistory, routerMiddleware } from './root-reducer';
import { pokemonDetails } from './services/pokemon-details';
import { pokemonsList } from './services/pokemons-list';


const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .prepend(routerMiddleware)
    .concat(pokemonsList.middleware, pokemonDetails.middleware)
});

export default store;

// helper to get typed store
export const getStore = () => store;


export const history = createReduxHistory(store);