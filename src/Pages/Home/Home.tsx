import React from 'react';
import BlogList from '../../components/BlogList/BlogList';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className={styles.root}>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className={styles.main}>
        <Sidebar />
        <BlogList searchValue={searchValue} />
      </div>
    </div>
  );
};

export default Home;
