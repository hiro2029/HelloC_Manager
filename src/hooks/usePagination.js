import {useContext, useEffect} from 'react';
import {PaginationContext} from '../contexts/PaginationContext';

export const usePagination = () => {
  const {perPage, setPerPage, offset, setOffset} = useContext(PaginationContext);

  return {perPage, setPerPage, offset, setOffset};
};
