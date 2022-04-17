import store from '.';
import { rootReducer } from './root-reducer';

export type TAppState = ReturnType<typeof rootReducer>;
export type TDispatch =
  typeof store.dispatch; /* ThunkDispatch<TAppState, void, AnyAction>; */
export type TStore = typeof store;
export type TGetState = () => TAppState;
