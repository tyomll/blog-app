import React from 'react';
import s from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <ul>
          <li>Dashboard</li>
          <li>Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
