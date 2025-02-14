import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import UserProvider from '../store/UserContext';

const AuthGuard = ({ redirectTo = '/', requiresAuth, children }) => {
  const { token } = useContext(UserProvider)

  // Redirect unauthenticated users to the login page if authentication is required
  if (requiresAuth && !token) {
    return <Navigate to='/login' replace />;
  }

  // Redirect authenticated users away from login and registration pages
  if (!requiresAuth && token) {
    if (window.location.pathname === '/login' || window.location.pathname === '/register') {
      return <Navigate to='/' replace />;
    }
  }

  return children || <Outlet />;
};

export default AuthGuard;
