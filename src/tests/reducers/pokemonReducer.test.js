import pokemonReducer, { DEFAULT_POKEMONS_STATE } from "../../reducers/pokemonReducer";
import { actionGetPokemonList, actionGetPokemonListStarted, actionGetPokemonListFinished } from "../../actions/actionPokemonList";
import { POKEMON_LIST } from "../fixtures/pokemon-list";

test('Should set default state', () => {
    const state = pokemonReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(DEFAULT_POKEMONS_STATE);
});

test('should change loading to true for GET_POKEMON_LIST_STARTED action', () => {
    const state = pokemonReducer(undefined, actionGetPokemonListStarted());

    const newState = {
        ...DEFAULT_POKEMONS_STATE,
        loading: true
    };

    expect(state).toEqual(newState);
});


test('should change loading to false for GET_POKEMON_LIST_FINISHED action', () => {
    const prevState = {
        ...DEFAULT_POKEMONS_STATE,
        loading: true
    }
    const payload = {
        ...POKEMON_LIST,
        results: [],
        count: 0
    };
    const state = pokemonReducer(prevState, actionGetPokemonListFinished(1, payload, true));

    const newState = {
        ...DEFAULT_POKEMONS_STATE,
        loading: false
    };

    expect(state).toEqual(newState);
});


test('should change page for GET_POKEMON_LIST_FINISHED action', () => {
    const prevState = {
        ...DEFAULT_POKEMONS_STATE
    }
    const payload = {
        ...POKEMON_LIST,
        results: [],
        count: 0
    };
    const state = pokemonReducer(prevState, actionGetPokemonListFinished(2, payload, true));

    const newState = {
        ...DEFAULT_POKEMONS_STATE,
        page: 2
    };

    expect(state).toEqual(newState);
});


test('should change noMore to true for GET_POKEMON_LIST_FINISHED action', () => {
    const prevState = {
        ...DEFAULT_POKEMONS_STATE
    };
    const payload = {
        ...POKEMON_LIST,
        results: [],
        count: 0,
        next: null
    };
    const state = pokemonReducer(prevState, actionGetPokemonListFinished(1, payload, true));

    const newState = {
        ...DEFAULT_POKEMONS_STATE,
        noMore: true
    };

    expect(state).toEqual(newState);
});

test('should change count for GET_POKEMON_LIST_FINISHED action', () => {
    const prevState = {
        ...DEFAULT_POKEMONS_STATE
    };
    const payload = {
        ...POKEMON_LIST,
        results: [
            { "url": "https:\/\/pokeapi.co\/api\/v2\/pokemon\/21\/", "name": "spearow" },
            { "url": "https:\/\/pokeapi.co\/api\/v2\/pokemon\/22\/", "name": "fearow" }
        ]
    };
    const state = pokemonReducer(prevState, actionGetPokemonListFinished(1, payload, true));

    const newState = {
        ...DEFAULT_POKEMONS_STATE,
        list: [
            { "url": "https:\/\/pokeapi.co\/api\/v2\/pokemon\/21\/", "name": "spearow", id:21 },
            { "url": "https:\/\/pokeapi.co\/api\/v2\/pokemon\/22\/", "name": "fearow", id:22 }
        ],
        count: POKEMON_LIST.count
    };

    expect(state).toEqual(newState);
});


test('should change list for GET_POKEMON_LIST_FINISHED action', () => {
    const prevState = {
        ...DEFAULT_POKEMONS_STATE,
        list: ["one"]
    };
    const payload = {
        ...POKEMON_LIST,
        results: [
            { "url": "https:\/\/pokeapi.co\/api\/v2\/pokemon\/21\/", "name": "spearow" },
            { "url": "https:\/\/pokeapi.co\/api\/v2\/pokemon\/22\/", "name": "fearow" }
        ]
    };
    const state = pokemonReducer(prevState, actionGetPokemonListFinished(1, payload, true));

    const newState = {
        ...DEFAULT_POKEMONS_STATE,
        list: [...prevState.list, ...[
            { "url": "https:\/\/pokeapi.co\/api\/v2\/pokemon\/21\/", "name": "spearow", id:21 },
            { "url": "https:\/\/pokeapi.co\/api\/v2\/pokemon\/22\/", "name": "fearow", id:22 }
        ]],
        count: POKEMON_LIST.count
    };

    expect(state).toEqual(newState);
});


test('should change error to be not null for GET_POKEMON_LIST_FINISHED failed action', () => {
    const prevState = {
        ...DEFAULT_POKEMONS_STATE
    };
    const payload = {
        ...POKEMON_LIST,
        next: null
    };
    const state = pokemonReducer(prevState, actionGetPokemonListFinished(1, { error: "error" }, false));

    const newState = {
        ...DEFAULT_POKEMONS_STATE,
        error: { error: 'error' }
    };

    expect(state).toEqual(newState);
});

