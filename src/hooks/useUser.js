import {useContext} from 'react';
import {
  getUsers as getUsersAPI,
  getUser as getUserAPI,
  createUser as createUserAPI,
  editUser,
  deleteUser as deleteUserAPI,
} from '../components/API/UserAPIs';

import {loginUser as loginUserAPI, registerUser as registerUserAPI} from '../components/API/AuthAPIs';

import {UserContext} from '../contexts/UserContext';
import {ErrorContext} from '../contexts/ErrorContext';

export const useUser = () => {
  const {setError, setIsOpenError} = useContext(ErrorContext);
  const {users, setUsers, selectUser, setSelectUser} = useContext(UserContext);

  const updateUser = async (data) => {
    return await editUser(data).then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      } else {
        return getUsers();
      }
    });
  };

  const deleteUser = async (id) => {
    return await deleteUserAPI(id).then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      } else {
        return getUsers();
      }
    });
  };

  const createUser = async (data) => {
    return await createUserAPI(data).then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      }
      return getUsers();
    });
  };

  const createUsers = async (datas) => {
    return await Promise.all(
      datas.map(async (data) => {
        return await createUserAPI(data).then((json) => {
          if (json.status === 'fail') {
            setIsOpenError(true);
            setError(json.content);
          }
        });
      })
    ).then(() => getUsers());
  };

  const getUser = async (id) => {
    return await getUserAPI(id).then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
        return {status: json.status, content: '取得失敗'};
      } else {
        return json;
      }
    });
  };

  const getUsers = async () => {
    return await getUsersAPI().then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      } else {
        setUsers(json.content);
      }
      return json;
    });
  };

  const registerUser = async (jsonData) => {
    return await registerUserAPI(jsonData).then((json) => {
      if (json.status && json.status === 'fail') {
        return json;
      }
      return loginUser(jsonData);
    });
  };

  const loginUser = async (jsonData) => {
    return await loginUserAPI(jsonData).then((json) => {
      return json;
    });
  };

  const initSelectUser = () => {
    setSelectUser({
      name: '',
      mail: '',
      password: '',
      role: '',
    });
  };

  return {
    users,
    setUsers,
    selectUser,
    setSelectUser,
    initSelectUser,
    updateUser,
    deleteUser,
    createUser,
    createUsers,
    getUser,
    getUsers,
    registerUser,
    loginUser,
  };
};
