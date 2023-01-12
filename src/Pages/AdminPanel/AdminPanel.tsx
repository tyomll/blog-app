import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import s from './AdminPanel.module.scss';
import Dashboard from './Dashboard/Dashboard';

const AdminPanel: React.FC = () => {
  const [pageIndex, setPageIndex] = React.useState(0);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Sidebar pageIndex={pageIndex} setPageIndex={setPageIndex} />
        <Dashboard />
      </div>
    </div>
  );
};

export default AdminPanel;
