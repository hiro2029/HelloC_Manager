import {BooksAPI} from '../../APILink';
import {
  addRecodeErrorCatch,
  createBookErrorCatch,
  deleteBookErrorCatch,
  getBookErrorCatch,
  getBooksErrorCatch,
  getRecodesErrorCatch,
  removeRecodeErrorCatch,
  updateBookErrorCatch,
} from './error/Book';

class BookError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'AuthError';
    this.status = response.status;
  }
}

export const getBooks = async () => {
  return await fetch(BooksAPI) //api
    .then((res) => {
      if (!res.ok) {
        throw new BookError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getBooksErrorCatch(-1);
      } else {
        return getBooksErrorCatch(error.status);
      }
    });
};

export const getBook = async (id) => {
  //id指定で1データ取る
  return await fetch(BooksAPI + '/' + id) //api
    .then((res) => {
      if (!res.ok) {
        throw new BookError(res);
      }
      return res.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getBookErrorCatch(-1);
      } else {
        return getBookErrorCatch(error.status);
      }
    });
};

export const checkBookInQuestions = async (id) => {
  return await fetch(BooksAPI + '/' + id + '/questions').then((res) => {
    if (res.status === 404) {
      return false;
    } else {
      return true;
    }
  });
};

export const createBook = async (jsonData) => {
  return await fetch(BooksAPI, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsonData.name,
      summary: jsonData.summary,
      access_key: jsonData.access_key,
      user_id: jsonData.user_id,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new BookError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return createBookErrorCatch(-1);
      } else {
        return createBookErrorCatch(error.status);
      }
    });
};

export const deleteBook = async (id) => {
  return await fetch(BooksAPI + '/' + id, {
    method: 'DELETE',
  })
    .then((res) => {
      if (!res.ok) {
        throw new BookError(res);
      }
    })
    .then(() => {
      return {status: 'success', content: '教材削除に成功しました！'};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return deleteBookErrorCatch(-1);
      } else {
        return deleteBookErrorCatch(error.status);
      }
    });
};

export const updateBook = async (id, jsonData) => {
  return await fetch(BooksAPI + '/' + id, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsonData.name,
      summary: jsonData.summary,
      access_key: jsonData.access_key,
      user_id: jsonData.user_id,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new BookError(res);
      }
    })
    .then(() => {
      return {status: 'success', content: '教材更新に成功しました！'};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return updateBookErrorCatch(-1);
      } else {
        return updateBookErrorCatch(error.status);
      }
    });
};

export const getRecodes = async (id) => {
  return await fetch(BooksAPI + '/' + id + '/questions')
    .then((res) => {
      if (!res.ok) {
        throw new BookError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getRecodesErrorCatch(-1);
      } else {
        return getRecodesErrorCatch(error.status);
      }
    });
};

export const addRecode = async (jsonData) => {
  return await fetch(BooksAPI + '/addRecord', {
    body: JSON.stringify({book_id: jsonData.book_id, question_id: jsonData.question_id}),
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
  }) //api groups/addBook
    .then((res) => {
      if (!res.ok) {
        throw new BookError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return addRecodeErrorCatch(-1);
      } else {
        return addRecodeErrorCatch(error.status);
      }
    });
};

export const removeRecode = async (jsonData) => {
  console.log(jsonData);
  return await fetch(BooksAPI + '/removeRecord', {
    body: JSON.stringify({book_id: jsonData.book_id, question_id: jsonData.question_id}),
    headers: {'Content-Type': 'application/json'},
    method: 'DELETE',
  }) //api groups/addBook
    .then((res) => {
      if (!res.ok) {
        throw new BookError(res);
      }
    })
    .then(() => {
      return {status: 'success', content: '教材内問題の削除に成功しました！'};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return removeRecodeErrorCatch(-1);
      } else {
        return removeRecodeErrorCatch(error.status);
      }
    });
};
