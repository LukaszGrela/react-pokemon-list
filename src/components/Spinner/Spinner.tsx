import React from 'react';

import './style/index.scss';

const Spinner: React.FC = (): JSX.Element => (
  <div className="Spinner">
    <svg
      version="1"
      className="Spinner_svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
    >
      <circle cx="20" cy="20" r="18" id="bg" />
      <circle cx="20" cy="20" r="18" id="fg" />
    </svg>
  </div>
);
export default Spinner;
