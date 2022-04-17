import React from 'react';
import IconCross from '../icons/IconCross';
import { IProps } from './types';
import './style/index.scss';

const CloseModal: React.FC<IProps> = ({
  onClick,
  describedBy,
}): JSX.Element => {
  return (
    <button
      type="button"
      className="CloseModal"
      onClick={onClick}
      aria-describedby={describedBy}
    >
      <IconCross />
    </button>
  );
};

export default CloseModal;
