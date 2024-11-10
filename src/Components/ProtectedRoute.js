import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const ProtectedRoute = ({ element, redirectTo = "/", isProtected = true }) => {
    const { user } = useAuth();
  
    if (isProtected && user) {
      return <Navigate to={redirectTo} />;
    }
  
    if (!isProtected && !user) {
      return <Navigate to="/login" />;
    }
  
    return element;
};

export default ProtectedRoute;
