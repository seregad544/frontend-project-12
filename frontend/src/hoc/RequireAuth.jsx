import { Navigate } from 'react-router-dom';
import { React, useContext } from 'react';
import { AuthorizationContext } from '../AuthorizationContext';

function RequireAuth({ children }) {
  const { authorization } = useContext(AuthorizationContext);

  if (authorization.status !== true) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default RequireAuth;
