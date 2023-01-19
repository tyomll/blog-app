import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import s from './AdminPanel.module.scss';
import Dashboard from './Dashboard/Dashboard';
import Header from './Header/Header';
import Users from './Users/Users';
import Posts from './Posts/Posts';
import { Route, Routes } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const [page, setPage] = React.useState<string>('');

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.sidebar}>
          <Sidebar page={page} setPage={setPage} />
        </div>
        <div className={s.content}>
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
