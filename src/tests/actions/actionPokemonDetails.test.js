import axios from 'axios';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    actionGetPokemonDetailsStarted,
    GET_POKEMON_DETAILS_STARTED,
    actionGetPokemonDetailsFinished,
    GET_POKEMON_DETAILS_FINISHED,
    actionGetPokemonDetails
} from "../../actions/actionPokemonDetails";
import { POKEMON_3 } from '../fixtures/pokemon-list';
import { DEFAULT_DETAILS_STATE } from '../../reducers/pokemonDetailsReducer';

test('Should create correct action object for actionGetPokemonDetailsStarted', () => {
    const action = actionGetPokemonDetailsStarted(1);
    expect(action).toEqual({
        type: GET_POKEMON_DETAILS_STARTED,
        id: 1
    });
});

test('Should create correct action object for actionGetPokemonDetailsFinished', () => {
    const action = actionGetPokemonDetailsFinished({}, true);
    expect(action).toEqual({
        type: GET_POKEMON_DETAILS_FINISHED,
        payload: {},
        success: true,
        cached: false
    });
});



const createMockStore = configureMockStore([thunk]);

test('Should correctly request pokemon details and fire success actionGetPokemonDetailsFinished',
    (done) => {
        const response = POKEMON_3;
        const store = createMockStore({ details: DEFAULT_DETAILS_STATE });

        moxios.withMock(() => {
            store.dispatch(actionGetPokemonDetails(3));

            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response
                }).then(() => {
                    const actions = store.getActions();
                    expect(actions).toEqual([
                        actionGetPokemonDetailsStarted(3),
                        actionGetPokemonDetailsFinished(response, true, false)
                    ]);
                    done();
                })
            });
        });

    });


test('Should correctly request pokemon details and fire success actionGetPokemonDetailsFinished with cached true',
    (done) => {
        const storeData = {
            details: {
                ...DEFAULT_DETAILS_STATE, dict: {
                    'pokemon-3': {
                        stats: [...POKEMON_3.stats],
                        weight: POKEMON_3.weight,
                        height: POKEMON_3.height,
                        base_experience: POKEMON_3.base_experience
                    }
                }
            }
        };
        const payload = {
            stats: [...POKEMON_3.stats],
            weight: POKEMON_3.weight,
            height: POKEMON_3.height,
            base_experience: POKEMON_3.base_experience
        };
        const store = createMockStore(storeData);


        store.dispatch(actionGetPokemonDetails(3)).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual([
                actionGetPokemonDetailsStarted(3),
                actionGetPokemonDetailsFinished(payload, true, true)
            ]);
            done();
        });

    });

test('Should correctly request pokemon details and fire failure actionGetPokemonDetailsFinished',
    (done) => {
        const response = {"message":"Error"};
        const store = createMockStore({ details: DEFAULT_DETAILS_STATE });

        moxios.withMock(() => {
            store.dispatch(actionGetPokemonDetails(3));

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();

                request.respondWith({
                    status: 501,
                    response
                }).then(()=>{
                    const actions = store.getActions();

                    let finishAction = actionGetPokemonDetailsFinished(response, false);
                    finishAction.payload = expect.anything();
    
    
                    expect(actions).toEqual([
                        actionGetPokemonDetailsStarted(3),
                        finishAction
                    ]);
    
                    done();
                });
            });
        });
    });