import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../Modal/Modal';
import PokemonList from '../PokemonList/PokemonList';
import './style/index.scss';

const Home: React.FC = (): JSX.Element => {
  const { page } = useParams();
  const [showModal, setShowModal] = useState(false)

  const handlePokemonSelection = (pid: string): void => {
    console.log('', pid);
    setShowModal(true)
  }

  return (
    <main className='Home'>
      <header>
        <h1>Pokémon List</h1>
      </header>
      <PokemonList page={page ? parseInt(page) : 1} interactive={!showModal} handlePokemonSelect={handlePokemonSelection} />
      <footer>{page}</footer>
      <Modal
        isOpen={showModal}
        closeModal={() => {
          setShowModal(false)
        }}
      >Modal</Modal>
    </main>
  );
};

export default Home;
