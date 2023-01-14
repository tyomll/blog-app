import React from 'react';
import s from './Dashboard.module.scss';
import CardList from './CardList/CardList';
import Header from '../Header/Header';
import Chart from './Chart/Chart';

const Dashboard = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        {/* <Header /> */}
        <CardList />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
