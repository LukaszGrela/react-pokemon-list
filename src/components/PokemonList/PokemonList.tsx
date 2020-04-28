import React, { useEffect, useState, ReactNode } from 'react';
import { getPokemonList, parseIdFromUrl } from '../../api';
import { INamedAPIResource, IAPIResourceList } from '../../store/model/pokemon';
import PokemonListItem from './PokemonListItem';

export interface IProps {
  page: number;
}

const PokemonList: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { page } = props;
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<INamedAPIResource[]>([]);

  useEffect((): (() => void) => {
    setLoading(true);
    const { signal, abort } = new AbortController();
    fetch(getPokemonList(page), { signal })
      .then((r) => r.json())
      .then((data: IAPIResourceList) => {
        console.log(data);
        setResults(data.results);
      })
      .catch((e: Error) => {
        if (e.name !== 'AbortError') {
          console.error(e);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      abort();
    };
  }, [page]);

  return (
    <>
      {loading && <div className='PokemonList'>Loading...</div>}
      {!loading && (
        <ul className='PokemonList'>
          {results.map(
            (resource: INamedAPIResource, i): ReactNode => {
              return (
                <PokemonListItem
                  key={i + (page - 1) * 20 + 1}
                  pid={`${parseIdFromUrl(resource.url) || ''}`}
                  name={resource.name}
                  n={i + (page - 1) * 20 + 1}
                />
              );
            }
          )}
        </ul>
      )}
    </>
  );
};

export default PokemonList;
