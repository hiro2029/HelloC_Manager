import {useState, useContext} from 'react';

import {
  getBooks as getBooksAPI,
  getBook as getBookAPI,
  createBook as createBookAPI,
  updateBook as updateBookAPI,
  deleteBook as deleteBookAPI,
  addRecode as addRecodeAPI,
  removeRecode as removeRecodeAPI,
  getRecodes as getRecodesAPI,
  checkBookInQuestions,
} from '../components/API/BookAPIs';

import {BookContext} from '../contexts/BookContext';
import {ErrorContext} from '../contexts/ErrorContext';

export const useBook = () => {
  const {books, setBooks} = useContext(BookContext);
  const {setError, setIsOpenError} = useContext(ErrorContext);

  const getBooks = async () => {
    return await getBooksAPI().then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      } else {
        setBooks(json.content);
      }
      return json;
    });
  };

  const createBook = (postData) => {
    createBookAPI(postData).then(async (json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      } else {
        return await getBooks();
      }
    });
  };

  const deleteBook = async (id, name) => {
    if (await checkBookInQuestions(id)) {
      alert('問題が登録されているため、削除できません。');
      return;
    }
    if (!confirm('教材名：' + name + ' 本当に削除しますか？')) {
      return;
    }
    deleteBookAPI(id).then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      } else {
        window.location.reload(); //404がどうしても返されるので強制的にリロードしてます
      }
    });
  };

  const updateBook = async (id, postData) => {
    return await updateBookAPI(id, postData).then(async (json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
        return json;
      } else {
        return {...json, content: await getBook(id)};
      }
    });
  };

  const getBook = async (id) => {
    return await getBookAPI(id).then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      }
      return json;
    });
  };

  /* 教材内問題の登録・削除用 */

  const addRecode = async (postData) => {
    return await addRecodeAPI(postData).then(async (json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      }
      return await getRecodes(postData.book_id);
    });
  };

  const removeRecode = async (postData) => {
    return await removeRecodeAPI(postData).then(async (json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      }
      return await getRecodes(postData.book_id);
    });
  };

  const getRecodes = async (id) => {
    return await getRecodesAPI(id).then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
        return [];
      } else {
        return json.content;
      }
    });
  };

  return {books, setBooks, getBooks, createBook, deleteBook, updateBook, getBook, addRecode, removeRecode, getRecodes};
};

/* Bookの編集・作成用のFormフック */

export const useBookPost = () => {
  const [bookPost, setBookPost] = useState({name: '', summary: '', access_key: '', user_id: ''});

  return {bookPost, setBookPost};
};

export const useBookRecodePost = (id) => {
  const [bookRecodePost, setBookRecodePost] = useState({book_id: id, question_id: 1});

  return {bookRecodePost, setBookRecodePost};
};
