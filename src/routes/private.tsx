import { useStore } from '@/store/store';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
interface ProtectedRouteProps {
  children: React.JSX.Element;
}

export const PrivateRoutes = ({ children }: ProtectedRouteProps) => {
  const user = useStore((state) => state.user);

  const location = useLocation();

  if (user === null) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={'/admin-login'} state={{ from: location }} replace />;
  }

  return children;
};
