import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../Modal/Modal';
import PokemonDetailsModalContent from '../PokemonDetailsModalContent/PokemonDetailsModalContent';
import PokemonList from '../PokemonList/PokemonList';
import './style/index.scss';

const Home: React.FC = (): JSX.Element => {
  const { page } = useParams();
  const modalId = 'pokemon-details-modal';
  const [showModal, setShowModal] = useState<{ pid: string, name: string } | null>(null)

  const handlePokemonSelection = (pid: string, pokemonName: string): void => {
    console.log('', pid, pokemonName);
    setShowModal(() => ({ pid, name: pokemonName }));
  }

  const isModalOpened = showModal != null;

  return (
    <main className='Home'>
      <header>
        <h1>Pokémon List</h1>
      </header>
      <PokemonList page={page ? parseInt(page) : 1} interactive={!isModalOpened} handlePokemonSelect={handlePokemonSelection} />
      <footer>{page}</footer>
      <Modal
        modalId={modalId}
        isOpen={isModalOpened}
        closeModal={() => {
          setShowModal(null)
        }}
      ><PokemonDetailsModalContent modalId={modalId}
        pid={showModal?.pid || ''} name={showModal?.name || ''} closeModal={() => {
          setShowModal(null)
        }} /></Modal>
    </main>
  );
};

export default Home;
