import s from './Dashboard.module.scss';
import CardList from './CardList/CardList';
import Chart from './Chart/Chart';

const Dashboard = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <CardList />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
