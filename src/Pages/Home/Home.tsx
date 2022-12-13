import React from "react";
import BlogList from "../../components/BlogList/BlogList";
import styles from './Home.module.scss'

const Home: React.FC = () => {
  return (
    <div className={styles.root}>
      <BlogList />
    </div>
  );
};

export default Home;
