import PokemonDetails from '../PokemonDetails/PokemonDetails';
import Spinner from '../Spinner/Spinner';
import { IProps } from './types';

const PokemonDetailsModalContent: React.FC<IProps> = ({
  modalId,
  pid,
  name,
  closeModal,
}): JSX.Element => {
  return (
    <div className='PokemonDetailsModalContent'>
      <header className='PokemonDetailsModalContent_header'>
        <h2
          id={`modal-${modalId}-title`}
          className='PokemonDetailsModalContent_title'
        >
          {`Details of ${name}`}
        </h2>
      </header>
      <section className='PokemonDetailsModalContent_body'>
        <PokemonDetails pid={pid} />
      </section>
      <footer className='PokemonDetailsModalContent_footer'>
        <Spinner />
      </footer>
    </div>
  );
};
export default PokemonDetailsModalContent;
