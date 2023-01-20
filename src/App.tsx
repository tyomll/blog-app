import React from 'react';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import UserPage from './Pages/UserPage/UserPage';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Profile from './Pages/Profile/Profile';
import PostPage from './Pages/PostPage/PostPage';
import { checkLoggedInUser } from './utils/checkLoggedInUser';
import LoggedInRoutes from './utils/LoggedInRoutes';
import PostCreatingPage from './Pages/PostCreatingPage/PostCreatingPage';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import { useAuth } from './hooks/use-auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loader from './components/Loader/Loader';
import LoggedOutRoutes from './utils/LoggedOutRoutes';

const App: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const { isAuth } = useAuth();
  const auth = getAuth();

  React.useEffect(() => {
    checkLoggedInUser();
    if (isAuth) {
      setLoading(false);
    }
  }, [isAuth]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <Routes>
        {/* Protected routes for everyone */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<PostPage />} />
        <Route path="/users/:id" element={<UserPage />} />

        {/* Protected routes for logged in users */}
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/create-post" element={<PostCreatingPage />} />
        </Route>

        {/* Protected routes for logged out users */}
        <Route element={<LoggedOutRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
