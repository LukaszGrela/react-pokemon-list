import React, { ReactNode } from 'react';
import { PAGINATION, parseIdFromUrl } from '../../api';
import type { TNamedAPIResource } from '../../store/model/common';
import { useGetPokemonsListQuery } from '../../store/services/pokemons-list';
import PokemonListItem from '../PokemonListItem/PokemonListItem';
import Spinner from '../Spinner/Spinner';

import './style/index.scss';
export interface IProps {
  page: number;

  interactive: boolean;

  handlePokemonSelect: (pid: string, name: string) => void;
}

const PokemonList: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { page, interactive, handlePokemonSelect } = props;
  const { data: results, error, isLoading: loading, } = useGetPokemonsListQuery(PAGINATION(page));

  return (
    <>{!loading && (
      <ul className={`PokemonList${interactive ? ' interactive' : ''}`}>
        {results?.results.map(
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
      {!loading && !error && !results && <span>No data found</span>}
      {loading && <div className='PokemonList PokemonList_loading'><Spinner /></div>}
      {!loading && error && <p>{`${error}`}</p>}
    </>
  );
};

export default PokemonList;
