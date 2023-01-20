import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import s from './AdminPanel.module.scss';
import Dashboard from './Dashboard/Dashboard';
import Header from './Header/Header';
import Users from './Users/Users';
import Posts from './Posts/Posts';
import { Route, Routes, useLocation } from 'react-router-dom';
import HelmetTitle from '../../components/HelmetTitle/HelmetTitle';

const AdminPanel: React.FC = () => {
  const [page, setPage] = React.useState<string>('');
  const location = useLocation();
  return (
    <div className={s.root}>
      <HelmetTitle title="Admin Panel" />
      <div className={s.container}>
        <div className={s.sidebar}>
          <Sidebar page={page} setPage={setPage} />
        </div>
        <div className={s.content}>
          {location.pathname === '/admin' && (
            <>
              <Header />
              <Dashboard />
            </>
          )}
          {location.pathname === '/admin/' && (
            <>
              <Header />
              <Dashboard />
            </>
          )}
          <Routes>
            <Route
              path={`/dashboard`}
              element={
                <>
                  <Header />
                  <Dashboard />
                </>
              }
            />
            <Route path={`/users`} element={<Users />} />
            <Route path={`/posts`} element={<Posts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
