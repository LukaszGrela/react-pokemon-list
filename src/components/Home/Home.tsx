import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PAGINATION } from '../../api';
import { useGetPokemonsListQuery } from '../../store/services/pokemons-list';
import InfiniteLoaderBar from '../InfiniteLoaderBar/InfiniteLoaderBar';
import Modal from '../Modal/Modal';
import Pagination from '../Pagination/Pagination';
import PokemonDetailsModalContent from '../PokemonDetailsModalContent/PokemonDetailsModalContent';
import PokemonList from '../PokemonList/PokemonList';
import './style/index.scss';

const Home: React.FC = (): JSX.Element => {
  const { page: paramPage } = useParams();
  const page = paramPage ? parseInt(paramPage, 10) : 1;
  const modalId = 'pokemon-details-modal';
  const [showModal, setShowModal] = useState<{
    pid: string;
    name: string;
  } | null>(null);

  const handlePokemonSelection = (pid: string, pokemonName: string): void => {
    setShowModal(() => ({ pid, name: pokemonName }));
  };

  const isModalOpened = showModal != null;

  const { data, error, isLoading, isFetching } = useGetPokemonsListQuery(
    PAGINATION(page)
  );

  return (
    <main className="Home">
      <header>
        <h1>Pokémon List</h1>
        {!isLoading && isFetching && <InfiniteLoaderBar />}
      </header>
      <PokemonList
        loading={isLoading || (data?.results.length === 0 && isFetching)}
        results={
          !isLoading && !error && (!data || data.results.length === 0)
            ? []
            : data?.results || []
        }
        interactive={!isModalOpened || isLoading || isFetching}
        handlePokemonSelect={handlePokemonSelection}
      />
      {!isLoading && error && <p>{`${error}`}</p>}
      <footer>
        <Pagination page={page} />
      </footer>
      <Modal
        modalId={modalId}
        isOpen={isModalOpened}
        closeModal={() => {
          setShowModal(null);
        }}
      >
        <PokemonDetailsModalContent
          modalId={modalId}
          pid={showModal?.pid || ''}
          name={showModal?.name || ''}
          closeModal={() => {
            setShowModal(null);
          }}
        />
      </Modal>
    </main>
  );
};

export default Home;
