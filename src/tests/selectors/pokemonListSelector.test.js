import { pokemonListSelector } from "../../selectors/pokemonListSelector";
import { POKEMON_LIST_RESULTS } from "../fixtures/pokemon-list";

test('Should return correct pokemon list entry', () => {
    const list = POKEMON_LIST_RESULTS;
    const result = pokemonListSelector(list, list[5].id);

    expect(result).toEqual(list[5]);

});

test('Should return null when id not matched', () => {
    const list = POKEMON_LIST_RESULTS;
    const result = pokemonListSelector(list, 1979);

    expect(result).toBeNull();

});