import React from 'react';
import { setCategory } from '../../redux/postsSlice/slice';
import styles from './Sidebar.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
const Sidebar: React.FC = () => {
  const categories: string[] = ['All', 'Blog', 'Webinar', 'Lifestyle', 'Health', 'Tourism'];
  const category = useAppSelector((state) => state.posts.category);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.root}>
      <ul>
        {categories.map((categoryName, i) => {
          return (
            <li
              key={i}
              onClick={() => dispatch(setCategory(categoryName.toLowerCase()))}
              style={{ color: categoryName.toLowerCase() === category ? 'orange' : 'black' }}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
