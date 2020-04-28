import React from 'react';

export interface IProps {
  n: number;
  pid: string;
  name: string;
}

const PokemonListItem: React.FC<IProps> = ({
  n,
  pid,
  name,
}: IProps): JSX.Element => {
  return (
    <li
      className='PokemonListItem'
      onClick={() => {
        window.location.hash = `/item/${pid}`;
        console.log(window.location.hash);
      }}
    >
      <span className='number'>#{n}</span>

      {/* <Image
    src={API_GET_SPRITE_FRONT(pid)}
    fallback={API_GET_SPRITE_FRONT('default/0')}
    ref="Image"
    alt={`Image of ${name} pokemon.`} /> */}

      <div className='PokemonListItem_name'>{name}</div>
    </li>
  );
};

export default PokemonListItem;
