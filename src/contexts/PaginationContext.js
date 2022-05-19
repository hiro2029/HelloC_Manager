import {useState, createContext} from 'react';

export const PaginationContext = createContext();

export const PaginationProvider = (props) => {
  const [perPage, setPerPage] = useState(Number(5));
  const [offset, setOffset] = useState(Number(0));
  return (
    <PaginationContext.Provider value={{perPage: perPage, setPerPage, offset: offset, setOffset}}>
      {props.children}
    </PaginationContext.Provider>
  );
};
