import { createBrowserHistory } from 'history';
import { combineReducers, Reducer, AnyAction } from 'redux';
import { createReduxHistoryContext, RouterActions, RouterState } from "redux-first-history";


export const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  //other options if needed 
  reduxTravelling: true,
});

type TAction = AnyAction & RouterActions;
export type TRootReducer = Reducer<
  {
    router: RouterState;
  },
  TAction
>;

const createRootReducer = (): TRootReducer =>
  combineReducers({
    router: routerReducer,
  });

export const rootReducer = createRootReducer();


