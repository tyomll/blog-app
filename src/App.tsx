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
import LoggedOutRoutes from './utils/LoggedOutRoutes';
import PostCreatingPage from './Pages/PostCreatingPage/PostCreatingPage';
import { CssVarsProvider } from '@mui/joy/styles';

const App: React.FC = () => {
  React.useEffect(() => {
    checkLoggedInUser();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route element={<LoggedInRoutes />}> */}
        <Route path="/profile" element={<Profile />} />
        {/* </Route> */}
        {/* <Route element={<LoggedOutRoutes />}> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* </Route> */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<PostPage />} />
        <Route path="/users/:id" element={<UserPage />} />

        <Route
          path="/create-post"
          element={
            <CssVarsProvider>
              <PostCreatingPage />{' '}
            </CssVarsProvider>
          }
        />
      </Routes>
    </>
  );
};

export default App;
