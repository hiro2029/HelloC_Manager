import {useState, createContext} from 'react';

export const BookContext = createContext();

export const BookProvider = (props) => {
  const [books, setBooks] = useState([]);
  const [selectBook, setSelectBook] = useState();
  return (
    <BookContext.Provider value={{books: books, setBooks, selectBook: selectBook, setSelectBook}}>
      {props.children}
    </BookContext.Provider>
  );
};
