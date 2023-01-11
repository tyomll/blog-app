import React from 'react';
import { setCategory } from '../../redux/postsSlice/slice';
import styles from './Sidebar.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import useCategories from '../../hooks/useCategories';
const Sidebar: React.FC = () => {
  const { getCategories } = useCategories();
  const [categories, setCategories] = React.useState<any>(null);
  const currentCategory = useAppSelector((state) => state.posts.category);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    getCategories(setCategories);
  }, []);

  return (
    <div className={styles.root}>
      <ul>
        <li
          onClick={() => dispatch(setCategory('all'.toLowerCase()))}
          style={{
            color: 'all'.toLowerCase() === currentCategory ? 'orange' : 'black',
          }}>
          All
        </li>
        {categories &&
          categories.map((category: any) => {
            return (
              <li
                key={category.id}
                onClick={() => dispatch(setCategory(category.title.toLowerCase()))}
                style={{
                  color: category.title.toLowerCase() === currentCategory ? 'orange' : 'black',
                }}>
                {category.title}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Sidebar;
