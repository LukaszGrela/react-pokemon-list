import axios from 'axios';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { actionGetPokemonEvolutionChainStarted, GET_POKEMON_EVOLUTION_CHAIN_STARTED, actionGetPokemonEvolutionChainFinished, GET_POKEMON_EVOLUTION_CHAIN_FINISHED, actionGetPokemonEvolutionChain } from "../../actions/actionPokemonEvolutionChain";
import { EVOLUTION_50 } from '../fixtures/pokemon-list';
import { DEFAULT_EVOLUTION_CHAIN_STATE } from '../../reducers/pokemonEvolutionReducer';

test('Should getPokemonEvolutionChainStarted create correct action object', () => {
    const action = actionGetPokemonEvolutionChainStarted(1);
    expect(action).toEqual({
        type: GET_POKEMON_EVOLUTION_CHAIN_STARTED,
        id: 1
    });
});
test('Should getPokemonEvolutionChainFinished create correct action object success', () => {
    const action = actionGetPokemonEvolutionChainFinished({}, true);
    expect(action).toEqual({
        type: GET_POKEMON_EVOLUTION_CHAIN_FINISHED,
        payload: {},
        success: true,
        cached: false
    });
});
test('Should getPokemonEvolutionChainFinished create correct action object success, cached', () => {
    const action = actionGetPokemonEvolutionChainFinished({}, true, true);
    expect(action).toEqual({
        type: GET_POKEMON_EVOLUTION_CHAIN_FINISHED,
        payload: {},
        success: true,
        cached: true
    });
});
test('Should getPokemonEvolutionChainFinished create correct action object failure', () => {
    const action = actionGetPokemonEvolutionChainFinished({ error: 'Message' }, false);
    expect(action).toEqual({
        type: GET_POKEMON_EVOLUTION_CHAIN_FINISHED,
        payload: { error: 'Message' },
        success: false,
        cached: false
    });
});
const createMockStore = configureMockStore([thunk]);

test('Should correctly request pokemon evolution chain and fire success actionGetPokemonEvolutionChainFinished',
    (done) => {
        const response = EVOLUTION_50;
        const store = createMockStore({ evolution: DEFAULT_EVOLUTION_CHAIN_STATE });

        moxios.withMock(() => {
            store.dispatch(actionGetPokemonEvolutionChain(50));
            moxios.wait(() => {

                let request = moxios.requests.mostRecent();

                request.respondWith({
                    status: 200,
                    response
                }).then(() => {
                    const actions = store.getActions();

                    expect(actions).toEqual([
                        actionGetPokemonEvolutionChainStarted(50),
                        actionGetPokemonEvolutionChainFinished(response, true)
                    ]);
                    done();
                });
            }, 200);
        });
    });

test('Should correctly request pokemon evolution chain and fire success actionGetPokemonEvolutionChainFinished with cached data',
    (done) => {
        const storeData = {
            evolution: {
                ...DEFAULT_EVOLUTION_CHAIN_STATE,
                dict: {
                    'pokemon-50': {
                        ...EVOLUTION_50
                    }
                }
            }
        };
        const store = createMockStore(storeData);
        const payload = EVOLUTION_50;

        store.dispatch(actionGetPokemonEvolutionChain(50)).then(() => {
            const actions = store.getActions();

            expect(actions).toEqual([
                actionGetPokemonEvolutionChainStarted(50),
                actionGetPokemonEvolutionChainFinished(payload, true, true)
            ])

            done();
        })
    });

    test('Should correctly request pokemon evolution chain and fire failure actionGetPokemonEvolutionChainFinished',
    (done) => {
        const response = {error:'message'};
        const store = createMockStore({ evolution: DEFAULT_EVOLUTION_CHAIN_STATE });

        moxios.withMock(() => {
            store.dispatch(actionGetPokemonEvolutionChain(50));
            moxios.wait(() => {

                let request = moxios.requests.mostRecent();

                request.respondWith({
                    status: 501,
                    response
                }).then(() => {
                    const actions = store.getActions();

                    let finishAction = actionGetPokemonEvolutionChainFinished(response, false);
                    finishAction.payload = expect.anything();
    
                    expect(actions).toEqual([
                        actionGetPokemonEvolutionChainStarted(50),
                        finishAction
                    ]);
                    done();
                });
            }, 200);
        });
    });
