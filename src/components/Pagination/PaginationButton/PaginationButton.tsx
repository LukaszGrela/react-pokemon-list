import React, { type PropsWithChildren } from 'react';

export interface IProps {
  disabled?: boolean;
  onClick: () => void;
}
const PaginationButton: React.FC<PropsWithChildren<IProps>> = ({
  disabled,
  children,
  onClick,
}) => {
  return (
    <button
      className="PaginationButton"
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
