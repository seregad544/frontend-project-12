import {
  React, createContext, useState, useMemo, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';

const AuthorizationContext = createContext();

function AuthorizationProvider({ children }) {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const initialState = userData ? { status: true, userName: userData.name } : { status: false };
  const [authorization, setAuthorization] = useState(initialState);
  const { t } = useTranslation();
  const errorList = useMemo(() => ({
    409: t('errors.409'),
    401: t('errors.401'),
    required: t('validation.required'),
    uniqueName: t('validation.uniqueName'),
    minLength: t('validation.Name3-20'),
    maxLengt: t('validation.Name3-20'),
    minLengthPassword: t('validation.minPassword6'),
    passwordsDontMatch: t('validation.PasswordsDontMatch'),
  }), [t]);
  const login = (data) => {
    const { token, username: name } = data;
    localStorage.setItem('userData', JSON.stringify({ token, name }));
    setAuthorization({ status: true, userName: name });
  };
  const logout = () => {
    localStorage.removeItem('userData');
    setAuthorization({ status: false });
  };
  const errorHandler = useCallback((error) => ((errorList[error] === undefined) ? `${t('errors.default')} ${error}` : errorList[error]), [errorList, t]);

  const context = useMemo(() => ({
    authorization, login, logout, errorHandler,
  }), [authorization, errorHandler]);

  return (
    <AuthorizationContext.Provider value={context}>
      {children}
    </AuthorizationContext.Provider>
  );
}

export { AuthorizationProvider, AuthorizationContext };
