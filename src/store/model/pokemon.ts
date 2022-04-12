import { TNamedAPIResource, TPath, TResourceId, TResourceName } from './common';

type TNamedIdResource = TResourceId & TResourceName;

export interface IPokemonDetail extends TNamedIdResource {
  /**
   * The base experience gained for defeating this Pokémon.
   */
  base_experience: number;
  /**
   * The height of this Pokémon in decimetres.
   */
  height: number;
  /**
   * Set for exactly one Pokémon used as the default for each species.
   */
  is_default: boolean;
  /**
   * Order for sorting. Almost national order, except families are grouped together.
   */
  order: number;
  /**
   * The weight of this Pokémon in hectograms.
   */
  weight: number;
  /**
   * A list of abilities this Pokémon could potentially have.
   */
  abilities: TPokemonAbility[];
  /**
   * A list of forms this Pokémon can take on.
   */
  forms: TNamedAPIResource[];
  /**
   * A list of game indices relevent to Pokémon item by generation.
   */
  game_indices: TVersionGameIndex[];
  /**
   * A list of items this Pokémon may be holding when encountered.
   */
  held_items: TPokemonHeldItem[];
  /**
   * A link to a list of location areas, as well as encounter details pertaining to specific versions.
   */
  location_area_encounters: TPath;
  /**
   * A list of moves along with learn methods and level details pertaining to specific version groups.
   */
  moves: TPokemonMove[];
  /**
   * The species this Pokémon belongs to.
   * NamedAPIResource to (TPokemonSpecies)
   */
  species	:TNamedAPIResource;

}
/*
const a: IPokemonDetail = {
  id: 35,
  name: 'clefairy',
  base_experience: 113,
  height: 6,
  is_default: true,
  order: 56,
  weight: 75,
  abilities: [
    {
      is_hidden: true,
      slot: 3,
      ability: {
        name: 'friend-guard',
        url: 'https://pokeapi.co/api/v2/ability/132/',
      },
    },
  ],
  forms: [
    {
      name: 'clefairy',
      url: 'https://pokeapi.co/api/v2/pokemon-form/35/',
    },
  ],
  game_indices: [
    {
      game_index: 35,
      version: {
        name: 'white-2',
        url: 'https://pokeapi.co/api/v2/version/22/',
      },
    },
  ],
  held_items: [
    {
      item: {
        name: 'moon-stone',
        url: 'https://pokeapi.co/api/v2/item/81/',
      },
      version_details: [
        {
          rarity: 5,
          version: {
            name: 'ruby',
            url: 'https://pokeapi.co/api/v2/version/7/',
          },
        },
      ],
    },
  ],
  location_area_encounters: '/api/v2/pokemon/35/encounters',
  moves: [
    {
      move: {
        name: 'pound',
        url: 'https://pokeapi.co/api/v2/move/1/',
      },
      version_group_details: [
        {
          level_learned_at: 1,
          version_group: {
            name: 'red-blue',
            url: 'https://pokeapi.co/api/v2/version-group/1/',
          },
          move_learn_method: {
            name: 'level-up',
            url: 'https://pokeapi.co/api/v2/move-learn-method/1/',
          },
        },
      ],
    },
  ],
  species: {
    name: 'clefairy',
    url: 'https://pokeapi.co/api/v2/pokemon-species/35/',
  },
  sprites: {
    back_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png',
    back_female: null,
    back_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/35.png',
    back_shiny_female: null,
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png',
    front_female: null,
    front_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png',
    front_shiny_female: null,
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/35.svg',
        front_female: null,
      },
      home: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/35.png',
        front_female: null,
        front_shiny:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/35.png',
        front_shiny_female: null,
      },
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png',
      },
    },
    versions: {
      'generation-i': {
        'red-blue': {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/back/35.png',
          back_gray:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/back/gray/35.png',
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/35.png',
          front_gray:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/gray/35.png',
        },
        yellow: {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/back/35.png',
          back_gray:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/back/gray/35.png',
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/35.png',
          front_gray:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/gray/35.png',
        },
      },
      'generation-ii': {
        crystal: {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/back/35.png',
          back_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/back/shiny/35.png',
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/35.png',
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/shiny/35.png',
        },
        gold: {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/back/35.png',
          back_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/back/shiny/35.png',
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/35.png',
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/shiny/35.png',
        },
        silver: {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/back/35.png',
          back_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/back/shiny/35.png',
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/35.png',
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/shiny/35.png',
        },
      },
      'generation-iii': {
        emerald: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/35.png',
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/shiny/35.png',
        },
        'firered-leafgreen': {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/back/35.png',
          back_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/back/shiny/35.png',
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/35.png',
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/shiny/35.png',
        },
        'ruby-sapphire': {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/back/35.png',
          back_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/back/shiny/35.png',
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/35.png',
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/shiny/35.png',
        },
      },
      'generation-iv': {
        'diamond-pearl': {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/back/35.png',
          back_female: null,
          back_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/back/shiny/35.png',
          back_shiny_female: null,
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/35.png',
          front_female: null,
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/shiny/35.png',
          front_shiny_female: null,
        },
        'heartgold-soulsilver': {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/back/35.png',
          back_female: null,
          back_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/back/shiny/35.png',
          back_shiny_female: null,
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/35.png',
          front_female: null,
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/shiny/35.png',
          front_shiny_female: null,
        },
        platinum: {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/back/35.png',
          back_female: null,
          back_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/back/shiny/35.png',
          back_shiny_female: null,
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/35.png',
          front_female: null,
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/shiny/35.png',
          front_shiny_female: null,
        },
      },
      'generation-v': {
        'black-white': {
          animated: {
            back_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/35.gif',
            back_female: null,
            back_shiny:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/35.gif',
            back_shiny_female: null,
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/35.gif',
            front_female: null,
            front_shiny:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/35.gif',
            front_shiny_female: null,
          },
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/35.png',
          back_female: null,
          back_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/shiny/35.png',
          back_shiny_female: null,
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/35.png',
          front_female: null,
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/35.png',
          front_shiny_female: null,
        },
      },
      'generation-vi': {
        'omegaruby-alphasapphire': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/35.png',
          front_female: null,
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/shiny/35.png',
          front_shiny_female: null,
        },
        'x-y': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/35.png',
          front_female: null,
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/shiny/35.png',
          front_shiny_female: null,
        },
      },
      'generation-vii': {
        icons: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/35.png',
          front_female: null,
        },
        'ultra-sun-ultra-moon': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/35.png',
          front_female: null,
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/shiny/35.png',
          front_shiny_female: null,
        },
      },
      'generation-viii': {
        icons: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/35.png',
          front_female: null,
        },
      },
    },
  },
  stats: [
    {
      base_stat: 35,
      effort: 0,
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/',
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'fairy',
        url: 'https://pokeapi.co/api/v2/type/18/',
      },
    },
  ],
  past_types: [
    {
      generation: {
        name: 'generation-v',
        url: 'https://pokeapi.co/api/v2/generation/5/',
      },
      types: [
        {
          slot: 1,
          type: {
            name: 'normal',
            url: 'https://pokeapi.co/api/v2/type/1/',
          },
        },
      ],
    },
  ],
};
*/
export type TVersionGameIndex = {
  /**
   * The internal id of an API resource within game data.
   */
  game_index: number;

  /**
   * The version relevent to this game index.
   * TNamedAPIResource to TVersion
   */
  version: TNamedAPIResource;
};
/*

past_types	
A list of details showing types this pokémon had in previous generations

PokemonTypePast[]
sprites	
A set of sprites used to depict this Pokémon in the game. A visual representation of the various sprites can be found at PokeAPI/sprites

PokemonSprites

stats	
A list of base stat values for this Pokémon.

PokemonStat[]
types	
A list of details showing types this Pokémon has.

PokemonType[]
*/
export type TPokemonAbility = {
  /**
   * Whether or not this is a hidden ability.
   */
  is_hidden: boolean;
  /**
   * The slot this ability occupies in this Pokémon species.
   */
  slot: number;
  /**
   * The ability the Pokémon may have.
   * TNamedAPIResource to TAbility
   */
  ability: TNamedAPIResource;
};

/*
PokemonType (type)
Name	Description	Type
slot	
The order the Pokémon's types are listed in.

integer
type	
The type the referenced Pokémon has.

NamedAPIResource (Type)
PokemonFormType (type)
Name	Description	Type
slot	
The order the Pokémon's types are listed in.

integer
type	
The type the referenced Form has.

NamedAPIResource (Type)
PokemonTypePast (type)
Name	Description	Type
generation	
The last generation in which the referenced pokémon had the listed types.

NamedAPIResource (Generation)
types	
The types the referenced pokémon had up to and including the listed generation.

PokemonType[]
*/
export type TPokemonHeldItem = {
  /**
   * The item the referenced Pokémon holds. NamedAPIResource (Item)
   */
  item: TNamedAPIResource;
  /**
   * The details of the different versions in which the item is held.
   */
  version_details: TPokemonHeldItemVersion[];
};

export type TPokemonHeldItemVersion = {
  /**
   * The version in which the item is held.
   * TNamedAPIResource to TVersion
   */
  version: TNamedAPIResource;
  /**
   * How often the item is held.
   */
  rarity: number;
};

export type TPokemonMove = {
  /**
   * The move the Pokémon can learn.
   * TNamedAPIResource to TMove
   */
  move: TNamedAPIResource;
  /**
   * The details of the version in which the Pokémon can learn the move.
   */
  version_group_details: TPokemonMoveVersion[];
};

export type TPokemonMoveVersion = {
  /**
   * The method by which the move is learned.
   * TNamedAPIResource to (MoveLearnMethod)
   */
  move_learn_method: TNamedAPIResource;
  /**
   * The version group in which the move is learned.
   * NamedAPIResource (VersionGroup)
   */
  version_group: TNamedAPIResource;
  /**
   * The minimum level to learn the move.
   */
  level_learned_at: number;
};
/*
PokemonStat (type)
Name	Description	Type
stat	
The stat the Pokémon has.
*/
/*
NamedAPIResource (Stat)
effort	
The effort points (EV) the Pokémon has in the stat.

integer
base_stat	
The base value of the stat.

integer
*/
/*
PokemonSprites (type)
Name	Description	Type
front_default	
The default depiction of this Pokémon from the front in battle.

string
front_shiny	
The shiny depiction of this Pokémon from the front in battle.

string
front_female	
The female depiction of this Pokémon from the front in battle.

string
front_shiny_female	
The shiny female depiction of this Pokémon from the front in battle.

string
back_default	
The default depiction of this Pokémon from the back in battle.

string
back_shiny	
The shiny depiction of this Pokémon from the back in battle.

string
back_female	
The female depiction of this Pokémon fropokemonm the back in battle.

string
back_shiny_female	
The shiny female depiction of this Pokémon from the back in battle.

string
*/
