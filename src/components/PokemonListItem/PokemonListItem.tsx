import React from 'react';
import { Image } from '../Image';
import { API_GET_SPRITE_FRONT } from '../../api';

import './style/index.scss';

export interface IProps {
  pid: string;
  name: string;
  onClick: (pid: string) => void;
}

const PokemonListItem: React.FC<IProps> = ({
  pid,
  name,
  onClick,
}: IProps): JSX.Element => {
  return (
    <li className="PokemonListItem">
      <button
        type="button"
        onClick={() => {
          onClick(pid);
        }}
      >
        <div className="PokemonListItem_imageWrapper">
          <Image
            src={API_GET_SPRITE_FRONT(pid)}
            fallbackSrc={API_GET_SPRITE_FRONT('default/0')}
            alt={`Image of ${name} pokemon.`}
            className="PokemonListItem_image"
          />
        </div>

        <div className="PokemonListItem_name">{name}</div>
      </button>
    </li>
  );
};

export default PokemonListItem;
