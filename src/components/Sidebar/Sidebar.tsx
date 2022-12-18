import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/postsSlice/slice';
import { RootState } from '../../redux/store';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const categories: string[] = ['All', 'Blog', 'Webinar', 'Lifestyle', 'Health', 'Tourism'];
  const category = useSelector((state: RootState) => state.posts.category);
  const dispatch = useDispatch();
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
