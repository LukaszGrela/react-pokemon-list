import React, { useEffect, useState } from 'react';
import {
  API_GET_SPRITE_FRONT,
  API_GET_SPRITE_BACK,
  getPokemonDetail,
} from '../../api';
import { IPokemonDetail } from '../../store/model/pokemon';
import { Image } from '../Image';

export interface IProps {
  pid: string;
}

const PokemonDetails: React.FC<IProps> = ({ pid }: IProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IPokemonDetail | undefined>(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    fetch(getPokemonDetail(pid), { signal: abortController.signal })
      .then((response) => response.json() as Promise<IPokemonDetail>)
      .then((data) => setResults(data))
      .catch((e: Error) => {
        if (e.name !== 'AbortError') {
          console.error(e);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      abortController.abort();
    };
  }, [pid]);

  return (
    <div className='PokemonDetails'>
      <div className='PokemonDetails_wrapper'>
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
      </div>
    </div>
  );
};

export default PokemonDetails;
