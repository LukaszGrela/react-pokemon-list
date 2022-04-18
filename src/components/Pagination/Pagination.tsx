import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGINATION } from '../../api';
import { useGetPokemonsListQuery } from '../../store/services/pokemons-list';
import PaginationButton from './PaginationButton/PaginationButton';
import './style/index.scss';

export interface IProps {
  page?: number;
}
const Pagination: React.FC<IProps> = ({ page }: IProps): JSX.Element => {
  const pagination = PAGINATION(page);
  const { total } = useGetPokemonsListQuery(pagination, {
    selectFromResult: (data) => ({
      total: data.data?.count || 1,
    }),
  });
  const firstPage = 1;
  const currentPage = page || 1;
  const lastPage = Math.ceil(total / pagination.limit);

  const navigate = useNavigate();
  const handlePreviousPage = useCallback(() => {
    navigate(`/${Math.max(currentPage - 1, 1)}`);
  }, [navigate, currentPage]);
  const handleNextPage = useCallback(() => {
    navigate(`/${currentPage + 1}`);
  }, [currentPage, navigate]);
  const handleFastForward = useCallback(() => {
    navigate(`/${Math.min(currentPage + 10, lastPage)}`);
  }, [currentPage, lastPage, navigate]);
  const handleFastRewind = useCallback(() => {
    navigate(`/${Math.max(currentPage - 10, 1)}`);
  }, [currentPage, navigate]);

  return (
    <div className="Pagination">
      <div className="Pagination_wrapper">
        <PaginationButton
          disabled={currentPage <= firstPage}
          onClick={handleFastRewind}
        >
          {'<<'}
        </PaginationButton>
        <PaginationButton
          disabled={currentPage <= firstPage}
          onClick={handlePreviousPage}
        >
          {'<'}
        </PaginationButton>
        <span className="Pagination_progress">
          {currentPage}/{lastPage}
        </span>
        <PaginationButton
          disabled={currentPage >= lastPage}
          onClick={handleNextPage}
        >
          {'>'}
        </PaginationButton>
        <PaginationButton
          disabled={currentPage >= lastPage}
          onClick={handleFastForward}
        >
          {'>>'}
        </PaginationButton>
      </div>
    </div>
  );
};

export default Pagination;
