import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{
          from: location.pathname,
          message: 'Sign in with an admin account to access recruiter data.',
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
