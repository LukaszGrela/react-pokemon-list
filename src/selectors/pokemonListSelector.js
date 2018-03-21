export const pokemonListSelector = (list, id) => {
    const result = list.filter(item => item.id === id);

    return result.length > 0 ? result[0]:null;
};