import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const LoggedInRoutes = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default LoggedInRoutes;
