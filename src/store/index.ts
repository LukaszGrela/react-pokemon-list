import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TStore } from './types';
import { rootReducer, createReduxHistory, routerMiddleware } from './root-reducer';

const middleware = [
  routerMiddleware,
  thunk /*
  catchAllErrorHandler,
  unauthorisedErrorHandler, */,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const enhancers: any[] = [];
const composeEnhancers = composeWithDevTools({});

const store: TStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);

export default store;

// helper to get typed store
export const getStore: () => TStore = (): TStore => store as TStore;


export const history = createReduxHistory(store);