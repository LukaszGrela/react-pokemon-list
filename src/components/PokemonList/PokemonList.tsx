import React, { useEffect, useState } from 'react';
import { getPokemonList } from '../../api';

export interface IProps {
  page: number;
}

const PokemonList: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { page } = props;
  const [loading, setLoading] = useState(false);

  useEffect((): (() => void) => {
    setLoading(true);
    const { signal, abort } = new AbortController();
    fetch(getPokemonList(page), { signal })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
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

  return <>{loading && <ul className='PokemonList'></ul>}</>;
};

export default PokemonList;
