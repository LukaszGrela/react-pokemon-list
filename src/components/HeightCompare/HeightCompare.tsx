import React, { useState } from 'react';
import SilhouetteImage from '../SilhouetteImage/SilhouetteImage';
import StandingMan from '../StandingMan/StandingMan';
import { IProps } from './types';

import './style/index.scss';

const HeightCompare: React.FC<IProps> = ({ src, baseHeight, height, title }): JSX.Element => {
  const [error, setError] = useState(false);
  const manIsTaller = Math.max(baseHeight, height) === baseHeight;
  const heightMax = Math.max(baseHeight, height);
  const heightMin = Math.min(baseHeight, height);
  let scale = (heightMin / heightMax) * 100;
  let viewBox: string | undefined;

  if (scale < 17 && manIsTaller) {
    scale = 2 * Math.round(scale);

    viewBox = '0 300 160 85'
  }

  return (
    !error ? <div className='HeightCompare'>
      {title && <h3 className='HeightCompare_title'>{title}</h3>}
      <div className='HeightCompare_wrapper'>
        <div style={{ height: baseHeight > height ? '100%' : `${scale}%` }}>
          <StandingMan viewBox={viewBox} />
        </div>
        <div style={{ height: baseHeight < height ? '100%' : `${scale}%` }}>
          <SilhouetteImage src={src} color={0} onError={() => { setError(true) }} />
        </div>
      </div>
    </div> : <></>
  );
};

export default HeightCompare;
