import './style/index.scss';
import React from 'react';
import IconCross from '../icons/IconCross';
import { type IProps } from './types';

const CloseModal: React.FC<IProps> = ({ onClick, describedBy }) => {
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
