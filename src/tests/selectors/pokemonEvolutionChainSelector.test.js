import { pokemonEvolutionChainSelector } from "../../selectors/pokemonEvolutionChainSelector";

test('should select proper evolution chain', ()=>{
    const poke_1 = {
        id:1
    };
    const poke_2 = {
        id:2
    };
    const dict = {
        'pokemon-1':poke_1,
        'pokemon-2':poke_2
    };
    const selection = pokemonEvolutionChainSelector(dict, 1);

    expect(selection).toEqual(poke_1);
});
test('should return null for invalid id', ()=>{
    const poke_1 = {
        id:1
    };
    const poke_2 = {
        id:2
    };
    const dict = {
        'pokemon-1':poke_1,
        'pokemon-2':poke_2
    };
    const selection = pokemonEvolutionChainSelector(dict, 1979);

    expect(selection).toBeNull();
});