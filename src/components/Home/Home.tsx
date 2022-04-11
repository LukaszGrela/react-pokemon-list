import React from 'react';
import { useParams } from 'react-router-dom';
import PokemonList from '../PokemonList/PokemonList';
import './style/index.scss';

const Home: React.FC = (): JSX.Element => {
  const { page } = useParams();

  return (
    <main className='Home'>
      <header>
        <h1>Pokémon List</h1>
      </header>
      <PokemonList page={page ? parseInt(page) : 1} />
      <footer>{page}</footer>
    </main>
  );
};

export default Home;
