import { useGetPokemonByNameOrIdQuery } from '../../store/services/pokemon-details';
import { capitalise } from '../../utils/capitalise';
import Spinner from '../Spinner/Spinner';
import { IProps } from './types';

const PokemonDetailsModalContent: React.FC<IProps> = ({
  modalId,
  pid,
  name,
  closeModal,
}): JSX.Element => {
  const { data, error, isLoading, } = useGetPokemonByNameOrIdQuery(pid);

  const capitaliseName = capitalise(name);

  return (
    <div className='PokemonDetailsModalContent'>
      <header className='PokemonDetailsModalContent_header'>
        <h2
          id={`modal-${modalId}-title`}
          className='PokemonDetailsModalContent_title'
        >
          {isLoading ? `Loading of ${capitaliseName}` : `Details of ${capitaliseName}`}
        </h2>
      </header>
      <section className='PokemonDetailsModalContent_body'>
        {isLoading && <Spinner />}
        {!isLoading && error && <p>{`${error}`}</p>}
        {!isLoading && !error && data && <>
          <div className='pokemon-weight'>
            <span className='label'>Weight: </span>
            <span className='value'>{data.weight / 10 + 'kg'}</span>
          </div>
          <div className='pokemon-height'>
            <span className='label'>Height: </span>
            <span className='value'>{data.height / 10 + 'm'}</span>
          </div>
        </>}
        {!isLoading && !error && !data && <span>No data found</span>}
      </section>
      <footer className='PokemonDetailsModalContent_footer'>

      </footer>
    </div>
  );
};
export default PokemonDetailsModalContent;
