import React from 'react';
import BlogList from '../../components/BlogList/BlogList';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Home.module.scss';
import { useAuth } from '../../hooks/use-auth';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { removeUser } from '../../redux/userSlice/slice';

const Home: React.FC = () => {
  const { isAuth, email } = useAuth();
  const [searchValue, setSearchValue] = React.useState('');
  const dispatch = useAppDispatch();

  return (
    <div className={styles.root}>
      {isAuth && (
        <div>
          <h1>Welcome</h1>
          <button onClick={() => dispatch(removeUser())}>Log out from {email}</button>
        </div>
      )}
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className={styles.main}>
        <Sidebar />
        <BlogList searchValue={searchValue} />
      </div>
    </div>
  );
};

export default Home;
