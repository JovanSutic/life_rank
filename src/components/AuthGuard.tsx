import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { checkAndRefreshToken } from '../utils/token';

type AuthGuardProps = {
  children: React.ReactNode;
  isProtected: boolean;
  redirectPath: string;
};

function AuthGuard({ children, isProtected, redirectPath }: AuthGuardProps) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await checkAndRefreshToken();
      setIsAuth(valid);
      setAuthChecked(true);
    };
    checkAuth();
  }, [location]);

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  if (isProtected && !isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!isProtected && isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

export default AuthGuard;
