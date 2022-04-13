import React from 'react';
import {
  API_GET_SPRITE_FRONT,
  API_GET_SPRITE_BACK,
} from '../../api';
import { useGetPokemonByNameOrIdQuery } from '../../store/services/pokemon-details';
import { Image } from '../Image';
import Spinner from '../Spinner/Spinner';

export interface IProps {
  pid: string;
}

const PokemonDetails: React.FC<IProps> = ({ pid }: IProps): JSX.Element => {

  // Using a query hook automatically fetches data and returns query values
  const { data: results, error, isLoading: loading } = useGetPokemonByNameOrIdQuery(pid);
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')


  return (
    <div className='PokemonDetails'>
      <div className='PokemonDetails_wrapper'>
        {loading && <Spinner />}
        {!loading && <>
          <div className='pokemon-image column-left'>
            <Image
              src={API_GET_SPRITE_FRONT(pid)}
              fallbackSrc={API_GET_SPRITE_FRONT('default/0')}
              className='front'
              alt={`Image of {name} pokemon.`}
            />
            <Image
              src={API_GET_SPRITE_BACK(pid)}
              fallbackSrc={API_GET_SPRITE_FRONT('default/0')}
              className='back'
              alt={`Image of the back of the {name} pokemon.`}
            />
          </div>
          <div className='column-right'>
            {results && (
              <>
                <div className='pokemon-name'>{results.name}</div>
                <div className='pokemon-weight'>
                  <span className='label'>Weight: </span>
                  <span className='value'>{results.weight / 10 + 'kg'}</span>
                </div>
                <div className='pokemon-height'>
                  <span className='label'>Height: </span>
                  <span className='value'>{results.height / 10 + 'm'}</span>
                </div>
                {/* <PokemonStats stats={stats} /> */}
              </>
            )}
          </div>
        </>}
      </div>
    </div>
  );
};

export default PokemonDetails;
