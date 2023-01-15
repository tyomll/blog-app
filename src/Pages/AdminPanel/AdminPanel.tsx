import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import s from './AdminPanel.module.scss';
import Dashboard from './Dashboard/Dashboard';
import Header from './Header/Header';
import Users from './Users/Users';
import Posts from './Posts/Posts';

const AdminPanel: React.FC = () => {
  const [pageIndex, setPageIndex] = React.useState<number>(0);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.sidebar}>
          <Sidebar pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </div>
        <div className={s.content}>
          {pageIndex === 0 && (
            <>
              <Header />
              <Dashboard />
            </>
          )}
          {pageIndex === 1 && (
            <>
              <Users />
            </>
          )}
          {pageIndex === 2 && (
            <>
              <Posts />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
