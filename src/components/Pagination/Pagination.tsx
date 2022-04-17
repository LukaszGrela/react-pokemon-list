import React from 'react';

export interface IProps {
  page?: number;
}
const Pagination: React.FC<IProps> = ({ page }: IProps): JSX.Element => (
  <div className="Pagination">{page}</div>
);

export default Pagination;
