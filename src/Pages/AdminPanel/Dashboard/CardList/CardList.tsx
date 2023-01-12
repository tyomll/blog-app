import React from 'react';
import useDashboard from '../../../../hooks/dashboard';
import Card from '../Card/Card';
import s from './CardList.module.scss';

const cards = ['users', 'posts', 'todaysUsers', 'todaysPosts'];
const CardList: React.FC = () => {
  const dashboardData: any = useDashboard();

  return (
    <div className={s.cards}>
      {dashboardData &&
        cards.map((_, i) => {
          return <Card key={i} index={i} dashboardData={dashboardData} />;
        })}
    </div>
  );
};

export default CardList;
