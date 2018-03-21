export const pokemonDetailSelector = (dict, id) => {
    const key = 'pokemon-'+id;
    return dict.hasOwnProperty(key) ? dict[key] : null;
};