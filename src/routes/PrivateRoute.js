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
    return <div>Loading...</div>; 
  }

  return isAuthenticatedState ? <Element {...rest} /> : <Navigate to="/" />; 
};

export default PrivateRoute;
