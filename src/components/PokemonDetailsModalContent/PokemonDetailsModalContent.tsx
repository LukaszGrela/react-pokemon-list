import React, { useState } from 'react';
import { useGetPokemonByNameOrIdQuery } from '../../store/services/pokemon-details';
import { capitalise } from '../../utils/capitalise';
import { IProps } from './types';
import InfiniteLoaderBar from '../InfiniteLoaderBar/InfiniteLoaderBar';
import { API_GET_SPRITE_FRONT } from '../../api';
import HeightCompare from '../HeightCompare/HeightCompare';
import { Image } from '../Image';
import SilhouetteImage from '../SilhouetteImage/SilhouetteImage';
import './style/index.scss';
import CloseModal from '../CloseModal/CloseModal';
import { ECloseModalEnum } from '../Modal/enums';

const PokemonDetailsModalContent: React.FC<IProps> = ({
  modalId,
  pid,
  name,
  closeModal,
}): JSX.Element => {
  const [fallback, setUseFallback] = useState(false);
  const { data, error, isLoading } = useGetPokemonByNameOrIdQuery(pid);

  const capitaliseName = capitalise(name);

  return (
    <div className="PokemonDetailsModalContent">
      <header className="PokemonDetailsModalContent_header">
        <h2
          id={`modal-${modalId}-title`}
          className="PokemonDetailsModalContent_title"
        >
          {isLoading
            ? `Loading of ${capitaliseName}`
            : `Details of ${capitaliseName}`}
        </h2>
        <CloseModal
          describedBy={`modal-${modalId}-title`}
          onClick={() => {
            closeModal?.(ECloseModalEnum.DISMISSED);
          }}
        />
        {isLoading && <InfiniteLoaderBar />}
      </header>
      <section className="PokemonDetailsModalContent_body">
        {!isLoading && error && <p>{`${error}`}</p>}
        {!isLoading && !error && data && (
          <>
            {!fallback ? (
              <SilhouetteImage
                src={API_GET_SPRITE_FRONT(pid)}
                onError={() => {
                  setUseFallback(true);
                }}
              />
            ) : (
              <Image src={API_GET_SPRITE_FRONT('default/0')} />
            )}
            <div className="pokemon-details">
              <div className="pokemon-height">
                <span className="label">Height: </span>
                <span className="value">{`${data.height / 10}m`}</span>
              </div>
              <div className="pokemon-weight">
                <span className="label">Weight: </span>
                <span className="value">{`${data.weight / 10}kg`}</span>
              </div>
            </div>
            <HeightCompare
              title="Height comparison"
              src={API_GET_SPRITE_FRONT(pid)}
              baseHeight={1.8}
              height={data.height / 10}
            />
          </>
        )}
        {!isLoading && !error && !data && <span>No data found</span>}
      </section>
      <footer className="PokemonDetailsModalContent_footer" />
    </div>
  );
};
export default PokemonDetailsModalContent;
