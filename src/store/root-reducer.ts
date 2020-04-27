import { createBrowserHistory, History } from 'history';
import { combineReducers, Reducer, AnyAction } from 'redux';
import {
  LocationChangeAction,
  connectRouter,
  RouterState,
} from 'connected-react-router';

export const history = createBrowserHistory({
  // basename: '/', // The base URL of the app (see below)
  //   forceRefresh: false,      // Set true to force full page refreshes
  //   keyLength: 6,             // The length of location.key
  //   // A function to use to confirm navigation with the user (see below)
  //   getUserConfirmation: (message, callback) => callback(window.confirm(message))
});

type TAction = AnyAction & LocationChangeAction;
export type TRootReducer = Reducer<
  {
    router: RouterState;
  },
  TAction
>;

const createRootReducer = (history: History): TRootReducer =>
  combineReducers({
    router: connectRouter(history),
  });

export const rootReducer = createRootReducer(history);
