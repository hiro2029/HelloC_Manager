import {UsersAPI} from '../../APILink';
import {
  createUserErrorCatch,
  deleteUserErrorCatch,
  editUserErrorCatch,
  getUserErrorCatch,
  getUsersErrorCatch,
} from './error/User';

class UserError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'UserError';
    this.status = response.status;
  }
}

export const getUser = async (id) => {
  //id指定で1データ取る
  return await fetch(UsersAPI + '/' + id) //api
    .then((res) => {
      if (!res.ok) {
        throw new UserError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getUserErrorCatch(-1);
      } else {
        return getUserErrorCatch(error.status);
      }
    });
};

export const getUsers = async () => {
  //全ユーザー取得
  return await fetch(UsersAPI) //api
    .then((res) => {
      if (!res.ok) {
        throw new UserError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getUsersErrorCatch(-1);
      } else {
        return getUsersErrorCatch(error.status);
      }
    });
};

export const createUser = (jsonData) => {
  //ユーザー作成
  return fetch(UsersAPI, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsonData.name,
      mail: jsonData.mail,
      role: jsonData.role,
      password: jsonData.password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new UserError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return createUserErrorCatch(-1);
      } else {
        return createUserErrorCatch(error.status);
      }
    });
};

export const editUser = async (jsonData) => {
  //ユーザー編集
  return fetch(UsersAPI + '/' + jsonData.user_id, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsonData.name,
      mail: jsonData.mail,
      role: jsonData.role,
      password: jsonData.password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new UserError(res);
      }
    })
    .then(() => {
      return {status: 'success', content: 'ユーザー編集が正常に完了しました！'};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return editUserErrorCatch(-1);
      } else {
        return editUserErrorCatch(error.status);
      }
    });
};

export const deleteUser = async (id) => {
  return await fetch(UsersAPI + '/' + id, {
    method: 'DELETE',
  })
    .then((res) => {
      if (!res.ok) {
        throw new UserError(res);
      }
    })
    .then(() => {
      return {status: 'success', content: 'ユーザー削除が正常に完了しました！'};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return deleteUserErrorCatch(-1);
      } else {
        return deleteUserErrorCatch(error.status);
      }
    });
};
