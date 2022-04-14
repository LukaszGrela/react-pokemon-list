import React from 'react';
import SilhouetteImage from '../SilhouetteImage/SilhouetteImage';
import StandingMan from './StandingMan';

import './style/index.scss';

type TPathToPokemonPNG = string;
export interface IProps {
  src: TPathToPokemonPNG;

  /**
   * Base height that incoming height is compared to (human)
   */
  baseHeight: number;
  /**
   * Incoming height to compare (pokemon)
   */
  height: number;
}

const HeightCompare: React.FC<IProps> = ({ src }): JSX.Element => {
  return (
    <div className='HeightCompare'>
      <StandingMan />
      <SilhouetteImage src={src} />
    </div>
  );
};

export default HeightCompare;
