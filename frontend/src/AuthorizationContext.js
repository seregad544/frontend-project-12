import {
  React, createContext, useState,
} from 'react';
import { useTranslation } from 'react-i18next';

const AuthorizationContext = createContext();

function AuthorizationProvider({ children }) {
  const initialState = localStorage.getItem('token') ? { status: true, userName: localStorage.getItem('username') } : { status: false };
  const [authorization, setAuthorization] = useState(initialState);
  const { t } = useTranslation();
  const errorList = {
    409: t('errors.409'),
    401: t('errors.401'),
  };
  const login = (redirect) => {
    setAuthorization({ status: true, userName: localStorage.getItem('username') });
    redirect();
  };
  const logout = () => {
    localStorage.clear();
    setAuthorization({ status: false });
  };
  const errorHandler = (error) => ((errorList[error] === undefined) ? `${t('errors.default')} ${error}` : errorList[error]);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    authorization, login, logout, errorHandler,
  };

  return (
    <AuthorizationContext.Provider value={context}>
      {children}
    </AuthorizationContext.Provider>
  );
}

export { AuthorizationProvider, AuthorizationContext };
