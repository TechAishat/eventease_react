import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';

const ProtectedRoute = ({ children }) => {
  const session = useAuthStore((state) => state.getSession());
  const location = useLocation();

  if (!session) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
