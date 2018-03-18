import axios from 'axios';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import { actionGetPokemonListStarted, GET_POKEMON_LIST_STARTED, actionGetPokemonListFinished, GET_POKEMON_LIST_FINISHED, actionGetPokemonList } from "../../actions/actionPokemonList";
import { DEFAULT_POKEMONS_STATE } from '../../reducers/pokemonReducer';
import { API_GATEWAY, API_GET_POKEMON, API_LIST_POKEMON } from '../../constants/api';

/*
beforeEach(() => {
    moxios.install();
});
afterEach(() => {
    moxios.uninstall();
})
*/

test('should correctly generate action object for actionGetPokemonListStarted', () => {
    const action = actionGetPokemonListStarted();

    expect(action).toEqual({
        type: GET_POKEMON_LIST_STARTED
    });
});

test('Should correctly generate actionGetPokemonListFinished object', () => {
    const success = false;
    const payload = { a: 1 };
    const page = 1;
    const action = actionGetPokemonListFinished(page, payload, success);
    expect(action).toEqual({
        type: GET_POKEMON_LIST_FINISHED,
        success,
        payload,
        page
    });
});

const createMockStore = configureMockStore([thunk]);

test('Should correctly request pokemon list and fire success actionGetPokemonListFinished', (done) => {
    let onFulfilled = jest.fn();
    const response = { "count": 949, "previous": "https:\/\/pokeapi.co\/api\/v2\/pokemon\/?limit=20", "results": [{ "url": "https:\/\/pokeapi.co\/api\/v2\/pokemon\/21\/", "name": "spearow" }], "next": "https:\/\/pokeapi.co\/api\/v2\/pokemon\/?limit=20&offset=40" };
    const store = createMockStore({ pokemons: DEFAULT_POKEMONS_STATE });
    moxios.withMock(() => {
        // this executes the axios.get
        store.dispatch(actionGetPokemonList()).then(onFulfilled);

        moxios.wait(() => {
            let request = moxios.requests.mostRecent();

            request.respondWith({
                status: 200,
                response
            }).then(() => {
                const actions = store.getActions();
                expect(onFulfilled).toHaveBeenCalled();

                expect(actions).toEqual([
                    actionGetPokemonListStarted(),
                    actionGetPokemonListFinished(2, response, true)
                ]);
                done();
            })
        })
    });

});

test('Should correctly request pokemon list and fire failure actionGetPokemonListFinished', (done) => {
    const response = { "message": "Error" };
    const store = createMockStore({ pokemons: DEFAULT_POKEMONS_STATE });

    moxios.withMock(() => {
        store.dispatch(actionGetPokemonList());

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();


            request.respondWith({
                status: 404,
                response
            }).then(() => {
                const actions = store.getActions();

                let finishAction = actionGetPokemonListFinished(1, response, false);
                finishAction.payload = expect.anything();


                expect(actions).toEqual([
                    actionGetPokemonListStarted(),
                    finishAction
                ]);

                expect(request.url).toEqual(API_GATEWAY + API_LIST_POKEMON + '?limit=20');

                done();
            })
        });
    })
});