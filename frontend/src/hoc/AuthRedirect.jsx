import { Navigate, useLocation } from 'react-router-dom';
import { React, useContext } from 'react';
import { AuthorizationContext } from '../AuthorizationContext';

function AuthRedirect({ children }) {
  const { authorization } = useContext(AuthorizationContext);
  const { pathname } = useLocation();
  if (authorization.status === true && pathname !== '/') {
    return <Navigate to="/" />;
  }
  if (authorization.status !== true && pathname === '/') {
    return <Navigate to="/login" />;
  }
  return children;
}

export default AuthRedirect;
