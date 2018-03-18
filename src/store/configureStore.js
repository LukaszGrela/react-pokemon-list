import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import pokemonReducer from '../reducers/pokemonReducer';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store creation
export default () => {
    const store = createStore(
        combineReducers({
            pokemons: pokemonReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}