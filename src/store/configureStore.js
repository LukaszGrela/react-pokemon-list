import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import pokemonDetailsReducer from '../reducers/pokemonDetailsReducer';
import pokemonEvolutionReducer from '../reducers/pokemonEvolutionReducer';
import pokemonReducer from '../reducers/pokemonReducer';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store creation
export default () => {
    const store = createStore(
        combineReducers({
            pokemons: pokemonReducer,
            evolution: pokemonEvolutionReducer,
            details: pokemonDetailsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}