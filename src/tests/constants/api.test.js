import {
    API_GET_POKEMON,
    PAGINATION,
    API_GET_SPRITE_FRONT,
    API_GET_SPRITE_BACK,
    API_GET_EVOLUTION_CHAIN
} from "../../constants/api";

test('Should create correct API call for pokemon', () => {
    const path = API_GET_POKEMON(1);

    expect(path).toEqual('pokemon/1');
});

test('Should generate proper pagination params with default values', () => {
    const params = PAGINATION();
    expect(params).toEqual({
        limit: 20
    })
});

test('Should generate proper pagination params with custom values', () => {
    const params = PAGINATION(3, 30);
    expect(params).toEqual({
        limit: 30,
        offset: 60
    })
});

test('Should generate proper front sprite path', () => {
    const params = API_GET_SPRITE_FRONT(1);
    expect(params).toBe('/static/pokemon/1.png');
});

test('Should generate proper back sprite path', () => {
    const params = API_GET_SPRITE_BACK(1);
    expect(params).toBe('/static/pokemon/back/1.png');
});


test('Should create correct API call for pokemon', () => {
    const path = API_GET_EVOLUTION_CHAIN(1);

    expect(path).toEqual('evolution-chain/1');
});
