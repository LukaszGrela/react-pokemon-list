import pokemonEvolutionReducer, { DEFAULT_EVOLUTION_CHAIN_STATE } from "../../reducers/pokemonEvolutionReducer";
import { actionGetPokemonEvolutionChainStarted, actionGetPokemonEvolutionChainFinished } from "../../actions/actionPokemonEvolutionChain";

test('should set default state', () => {
    const state = pokemonEvolutionReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(DEFAULT_EVOLUTION_CHAIN_STATE);
});

test('should set loading to true on GET_POKEMON_EVOLUTION_CHAIN_STARTED', () => {
    const state = pokemonEvolutionReducer(undefined, actionGetPokemonEvolutionChainStarted(1));

    expect(state).toEqual({
        ...DEFAULT_EVOLUTION_CHAIN_STATE,
        loading: true
    });
});
test('should set error back to null on GET_POKEMON_EVOLUTION_CHAIN_STARTED', () => {
    const prevState = {
        ...DEFAULT_EVOLUTION_CHAIN_STATE,
        error: { message: 'error' }
    }

    const state = pokemonEvolutionReducer(prevState, actionGetPokemonEvolutionChainStarted(1));

    expect(state).toEqual({
        ...DEFAULT_EVOLUTION_CHAIN_STATE,
        loading: true
    });
});
test('should set loading back to false on GET_POKEMON_EVOLUTION_CHAIN_FINISHED', () => {
    const prevState = {
        ...DEFAULT_EVOLUTION_CHAIN_STATE,
        loading: true
    }
    const state = pokemonEvolutionReducer(prevState, actionGetPokemonEvolutionChainFinished({ id: 1 }, true, false));

    expect(state).toEqual({
        ...DEFAULT_EVOLUTION_CHAIN_STATE,
        loading: false
    });
});

test('should set error on GET_POKEMON_EVOLUTION_CHAIN_FINISHED failing', () => {
    const prevState = {
        ...DEFAULT_EVOLUTION_CHAIN_STATE,
        loading: true
    }
    const state = pokemonEvolutionReducer(prevState, actionGetPokemonEvolutionChainFinished({ message: 'error' }, false, false));

    expect(state).toEqual({
        ...DEFAULT_EVOLUTION_CHAIN_STATE,
        loading: false,
        error: { message: 'error' }
    });
});

test('should NOT modify dict on GET_POKEMON_EVOLUTION_CHAIN_FINISHED cached', () => {
    const prevState = {
        ...DEFAULT_EVOLUTION_CHAIN_STATE,
        loading: true,
        dict: { 'a': 1 }
    }
    const state = pokemonEvolutionReducer(prevState, actionGetPokemonEvolutionChainFinished({ id: 1 }, true, true));

    expect(state).toEqual({
        ...DEFAULT_EVOLUTION_CHAIN_STATE,
        loading: false,
        dict: { 'a': 1 }
    });
});

test('should add payload to dict on GET_POKEMON_EVOLUTION_CHAIN_FINISHED success', () => {
    const prevState = {
        ...DEFAULT_EVOLUTION_CHAIN_STATE,
        loading: true,
        dict: {}
    }
    const state = pokemonEvolutionReducer(prevState, actionGetPokemonEvolutionChainFinished({ id: 1, test: 'test' }, true, false));

    expect(state).toEqual({
        ...DEFAULT_EVOLUTION_CHAIN_STATE,
        loading: false,
        dict: { 'pokemon-1': { id: 1, test: 'test' } }
    });
});