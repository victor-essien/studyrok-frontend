import { useStore } from '@/store/store';
import { Navigate } from 'react-router-dom';
import React from 'react';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useStore((state) => state.user);

  if (user) {
    // If already logged in → no need for login/signup pages
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
