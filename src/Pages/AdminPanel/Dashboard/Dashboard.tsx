import React from 'react';
import s from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.cards}>
          <div className={s.card}>
            <h2>Users Count</h2>
            <span>200</span>
            <p>inch vor vichakagrutyun</p>
          </div>
          <div className={s.card}>
            <h2>Posts Count</h2>
            <span>100</span>
            <p>inch vor vichakagrutyun</p>
          </div>
          <div className={s.card}>
            <h2>New Users Today</h2>
            <span>200</span>
            <p>inch vor vichakagrutyun</p>
          </div>
          <div className={s.card}>
            <h2>New Posts Today</h2>
            <span>200</span>
            <p>inch vor vichakagrutyun</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
