import {useState, createContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authData, setAuthData] = useState();
  return <AuthContext.Provider value={{authData: authData, setAuthData}}>{props.children}</AuthContext.Provider>;
};
