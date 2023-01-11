import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import s from './AdminPanel.module.scss';
import Dashboard from './Dashboard/Dashboard';

const AdminPanel: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
};

export default AdminPanel;
