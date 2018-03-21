import { actionGetPokemonDetailsStarted, GET_POKEMON_DETAILS_STARTED, actionGetPokemonDetailsFinished, GET_POKEMON_DETAILS_FINISHED } from "../../actions/actionPokemonDetails";

test('Should create correct action object for actionGetPokemonDetailsStarted', () => {
    const action = actionGetPokemonDetailsStarted(1);
    expect(action).toEqual({
        type:GET_POKEMON_DETAILS_STARTED,
        id: 1
    });
});

test('Should create correct action object for actionGetPokemonDetailsFinished', () => {
    const action = actionGetPokemonDetailsFinished({},true);
    expect(action).toEqual({
        type:GET_POKEMON_DETAILS_FINISHED,
        payload:{},
        success:true,
        cached:false
    });
});
