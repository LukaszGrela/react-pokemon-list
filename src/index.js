import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { actionGetPokemonList } from './actions/actionPokemonList';

const store = configureStore();

import './styles/index.scss';

// get first list of pokemons before rendering the app
store.dispatch(actionGetPokemonList()).then(
    () => {
        ReactDOM.render(
            <Provider store={store}>
                <AppRouter />
            </Provider>,
            document.getElementById('app'));
    }
);
