// routes/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await isAuthenticated();
      setIsAuthenticatedState(!!user);
      setIsAuthChecked(true);
    };

    checkAuth();
  }, []);

  if (!isAuthChecked) {
    return <div>Loading...</div>; // Pode colocar um loading enquanto verifica a autenticação
  }

  return isAuthenticatedState ? <Element {...rest} /> : <Navigate to="/" />; // Redireciona se não autenticado
};

export default PrivateRoute;
