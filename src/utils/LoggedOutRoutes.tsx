import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const LoggedOutRoutes = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default LoggedOutRoutes;
