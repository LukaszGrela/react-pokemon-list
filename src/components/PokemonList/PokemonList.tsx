import React, { useEffect, useState, ReactNode } from 'react';
import { getPokemonList, parseIdFromUrl } from '../../api';
import type { TNamedAPIResource } from '../../store/model/common';
import type { IAPIResourceList } from '../../store/model/pokemon-list';
import PokemonListItem from '../PokemonListItem/PokemonListItem';

import './style/index.scss';
export interface IProps {
  page: number;

  interactive: boolean;

  handlePokemonSelect: (pid: string, name: string) => void;
}

const PokemonList: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { page, interactive, handlePokemonSelect } = props;
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TNamedAPIResource[]>([]);

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    fetch(getPokemonList(page), { signal: abortController.signal })
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
      abortController.abort();
    };
  }, [page]);

  return (
    <>
      {loading && <div className='PokemonList PokemonList_loading'>Loading...</div>}
      {!loading && (
        <ul className={`PokemonList${interactive ? ' interactive' : ''}`}>
          {results.map(
            (resource: TNamedAPIResource): ReactNode => {
              console.log(resource)
              const key = resource.url;
              return (
                <PokemonListItem
                  key={key}
                  pid={`${parseIdFromUrl(resource.url) || ''}`}
                  name={resource.name}
                  onClick={(pid) => handlePokemonSelect(pid, resource.name)}
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
