import { createBrowserHistory } from 'history';
import { combineReducers, Reducer, AnyAction } from 'redux';
import { createReduxHistoryContext, RouterActions, RouterState } from "redux-first-history";
import { pokemonDetails, TPokemonDetailsReducer } from './services/pokemon-details';


export const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  //other options if needed 
  reduxTravelling: true,
});

type TAction = AnyAction & RouterActions;
export type TRootReducer = Reducer<
  {
    router: RouterState;
    [pokemonDetails.reducerPath]: TPokemonDetailsReducer;
  },
  TAction
>;

const createRootReducer = (): TRootReducer =>
  combineReducers({
    router: routerReducer,
    // Add the generated reducer as a specific top-level slice
    [pokemonDetails.reducerPath]: pokemonDetails.reducer,
  });

export const rootReducer = createRootReducer();


