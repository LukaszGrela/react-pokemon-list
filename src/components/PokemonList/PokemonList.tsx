import React, { ReactNode } from 'react';
import { parseIdFromUrl } from '../../api';
import type { TNamedAPIResource } from '../../store/model/common';
import PokemonListItem from '../PokemonListItem/PokemonListItem';
import Spinner from '../Spinner/Spinner';

import './style/index.scss';

export interface IProps {
  results?: TNamedAPIResource[];

  interactive: boolean;
  loading?: boolean;

  handlePokemonSelect: (pid: string, name: string) => void;
}

const PokemonList: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { results, interactive, loading, handlePokemonSelect } = props;

  return (
    <>
      {!loading && results && results.length > 0 && (
        <ul className={`PokemonList${interactive ? ' interactive' : ''}`}>
          {results.map((resource: TNamedAPIResource): ReactNode => {
            const key = resource.url;
            return (
              <PokemonListItem
                key={key}
                pid={`${parseIdFromUrl(resource.url) || ''}`}
                name={resource.name}
                onClick={(pid) => handlePokemonSelect(pid, resource.name)}
              />
            );
          })}
        </ul>
      )}
      {!loading && (!results || results.length === 0) && (
        <div className="PokemonList PokemonList_noData">
          <span>No data found</span>
        </div>
      )}
      {loading && (
        <div className="PokemonList PokemonList_loading">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default PokemonList;
