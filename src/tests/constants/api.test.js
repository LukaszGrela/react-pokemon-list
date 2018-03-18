import { API_GET_POKEMON, PAGINATION } from "../../constants/api";

test('Should create correct API call for pokemon', () => {
    const path = API_GET_POKEMON(1);

    expect(path).toEqual('pokemon/1');
});

test('Should generate proper pagination params with default values', () => {
    const params = PAGINATION();
    expect(params).toEqual({
        limit:20
    })
});

test('Should generate proper pagination params with custom values', () => {
    const params = PAGINATION(3,30);
    expect(params).toEqual({
        limit:30,
        offset:60
    })
});