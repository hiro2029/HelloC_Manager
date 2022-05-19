import {useState, createContext} from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState({
    name: '',
    mail: '',
    password: '',
    role: '',
  });
  return (
    <UserContext.Provider value={{users: users, setUsers, selectUser: selectUser, setSelectUser}}>
      {props.children}
    </UserContext.Provider>
  );
};
