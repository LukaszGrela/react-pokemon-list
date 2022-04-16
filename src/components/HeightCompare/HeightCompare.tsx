import React from 'react';
import SilhouetteImage from '../SilhouetteImage/SilhouetteImage';
import StandingMan from '../StandingMan/StandingMan';

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

const HeightCompare: React.FC<IProps> = ({ src, baseHeight, height }): JSX.Element => {
  const heightMax = Math.max(baseHeight, height);
  const heightMin = Math.min(baseHeight, height);
  let scale = (heightMin / heightMax) * 100;
  let viewBox: string | undefined;

  if (scale < 17) {
    scale = 4 * Math.round(scale);
    viewBox = '0 375 165.175 125'
  }

  return (
    <div className='HeightCompare'>
      <div style={{ height: baseHeight > height ? '100%' : `${scale}%` }}>
        <StandingMan viewBox={viewBox} />
      </div>
      <div style={{ height: baseHeight < height ? '100%' : `${scale}%` }}>
        <SilhouetteImage src={src} color={0} />
      </div>
    </div>
  );
};

export default HeightCompare;
