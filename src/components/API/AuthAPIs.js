import {loginErrorCatch, registerErrorCatch} from './error/Auth';

class AuthError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'AuthError';
    this.status = response.status;
  }
}

export const loginUser = async (jsonData) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      mail: jsonData.mail,
      password: jsonData.password,
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new AuthError(res);
      }
      return {status: 'success', content: await res.json()};
    })
    .catch((error) => {
      console.error('ログイン失敗', error);
      if (error.status === undefined) {
        return loginErrorCatch(-1);
      } else {
        return loginErrorCatch(error.status);
      }
    });
};

export const registerUser = async (jsonData) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: jsonData.name,
      mail: jsonData.mail,
      role: jsonData.role,
      password: jsonData.password,
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new AuthError(res);
      }
      return {status: 'success', content: await res.json()};
    })
    .catch((error) => {
      console.error('新規登録失敗', error);
      if (error.status === undefined) {
        return registerErrorCatch(-1);
      } else {
        return registerErrorCatch(error.status);
      }
    });
};
