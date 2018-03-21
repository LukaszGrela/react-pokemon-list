import { pokemonDetailSelector } from "../../selectors/pokemonDetailSelector";

test('Should return correct detail object', () => {
    const dict = { 'pokemon-1': { "matched": true } }
    const result = pokemonDetailSelector(dict, 1);
    expect(result).toEqual(dict['pokemon-1']);
});

test('Should return null when detail not found', () => {
    const dict = { 'pokemon-1': { "matched": true } }
    const result = pokemonDetailSelector(dict, 1979);
    expect(result).toBeNull();
});