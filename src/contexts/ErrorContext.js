import {useEffect} from 'react';
import {createContext, useState} from 'react';

export const ErrorContext = createContext({
  error: '',
  setError: () => {},
  isOpenError: false,
  setIsOpenError: () => {},
});

export const ErrorProvider = (props) => {
  const [error, setError] = useState('');
  const [isOpenError, setIsOpenError] = useState(false);

  useEffect(() => {
    const viewError = setTimeout(() => setIsOpenError(false), 4000);
    return () => {
      clearTimeout(viewError);
    };
  }, [isOpenError]);

  return (
    <ErrorContext.Provider
      value={{
        error: error,
        setError,
        isOpenError: isOpenError,
        setIsOpenError,
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
};
