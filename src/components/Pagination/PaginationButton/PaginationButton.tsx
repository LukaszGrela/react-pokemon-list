import React, { PropsWithChildren } from 'react';

export interface IProps {
  disabled?: boolean;
  onClick: () => void;
}
const PaginationButton: React.FC<PropsWithChildren<IProps>> = ({
  disabled,
  children,
  onClick,
}): JSX.Element => {
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
