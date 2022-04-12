import { API_GET_SPRITE_BACK, API_GET_SPRITE_FRONT } from "../../api";
import { Image } from "../Image";
import Spinner from "../Spinner/Spinner";
import { IProps } from "./types";


const PokemonDetailsModalContent: React.FC<IProps> = ({
  modalId, pid, name, closeModal
}): JSX.Element => {
  return <div className="PokemonDetailsModalContent">
    <header className="PokemonDetailsModalContent_header">
      <h2
        id={`modal-${modalId}-title`}
        className="PokemonDetailsModalContent_title"
      >
        {`Details of ${name}`}
      </h2>
    </header>
    <section className="PokemonDetailsModalContent_body">
      <div className="PokemonDetails">
        <div className="PokemonDetails_wrapper">
          <div className='pokemon-image column-left'>
            <Image
              src={API_GET_SPRITE_FRONT(pid)}
              fallbackSrc={API_GET_SPRITE_FRONT('default/0')}
              className='front'
              alt={`Image of ${name} pokemon.`} />
            <Image
              src={API_GET_SPRITE_BACK(pid)}
              fallbackSrc={API_GET_SPRITE_FRONT('default/0')}
              className='back'
              alt={`Image of the back of the ${name} pokemon.`} />
          </div>
        </div>
      </div>
    </section>
    <footer className="PokemonDetailsModalContent_footer"><Spinner /></footer>
  </div>
}
export default PokemonDetailsModalContent;