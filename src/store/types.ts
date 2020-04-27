import { AnyAction, Store } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { rootReducer } from './root-reducer';

export type TAppState = ReturnType<typeof rootReducer>;
export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>;
export type TStore = Store<TAppState, AnyAction> & { dispatch: TDispatch };
export type TGetState = () => TAppState;
