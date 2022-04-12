import React, { useEffect, useState, ReactNode } from 'react';
import { getPokemonList, parseIdFromUrl } from '../../api';
import { INamedAPIResource, IAPIResourceList } from '../../store/model/pokemon';
import PokemonListItem from '../PokemonListItem/PokemonListItem';

import './style/index.scss';
export interface IProps {
  page: number;

  interactive: boolean;

  handlePokemonSelect: (pid: string) => void;
}

const PokemonList: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { page, interactive, handlePokemonSelect } = props;
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<INamedAPIResource[]>([]);

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
            (resource: INamedAPIResource): ReactNode => {
              console.log(resource)
              const key = resource.url;
              return (
                <PokemonListItem
                  key={key}
                  pid={`${parseIdFromUrl(resource.url) || ''}`}
                  name={resource.name}
                  onClick={handlePokemonSelect}
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
