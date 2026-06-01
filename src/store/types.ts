import store from '.';

export type TAppState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;
export type TStore = typeof store;
export type TGetState = () => TAppState;
