import {
  React, createContext, useState, useMemo,
} from 'react';

const AuthorizationContext = createContext();

function AuthorizationProvider({ children }) {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const initialState = userData ? { status: true, userName: userData.name } : { status: false };
  const [authorization, setAuthorization] = useState(initialState);

  const login = (data) => {
    const { token, username: name } = data;
    localStorage.setItem('userData', JSON.stringify({ token, name }));
    setAuthorization({ status: true, userName: name });
  };
  const logout = () => {
    localStorage.removeItem('userData');
    setAuthorization({ status: false });
  };

  const context = useMemo(() => ({
    authorization, login, logout,
  }), [authorization]);

  return (
    <AuthorizationContext.Provider value={context}>
      {children}
    </AuthorizationContext.Provider>
  );
}

export { AuthorizationProvider, AuthorizationContext };
