import React from 'react';
import BlogBlock from '../BlogBlock/BlogBlock';
import BlogBlockSkeleton from '../BlogBlock/Skeleton/BlogBlockSkeleton';
import styles from './BlogList.module.scss';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getPostsFromPostSlice } from '../../utils/fetchFromRedux';
interface BlogListProps {
  searchValue: string;
}
const BlogList: React.FC<BlogListProps> = ({ searchValue }) => {
  const blogs = useAppSelector((state) => state.posts.items);
  const category = useAppSelector((state) => state.posts.category);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getPostsFromPostSlice(setLoading);
  }, []);
  
  return (
    <div className={styles.root}>
      {loading &&
        blogs.map((_: any, i: any) => {
          return <BlogBlockSkeleton key={i} />;
        })}
      {!loading &&
        blogs
          .filter((blog: any) => {
            if (category !== 'all') {
              return blog.category === category;
            } else {
              return blog;
            }
          })

          .filter((blog: any) => {
            if (searchValue.trim() !== '') {
              return blog.title.toLowerCase().trim().includes(searchValue.trim().toLowerCase());
            } else {
              return blog;
            }
          })
          .map((blog: any) => {
            return <BlogBlock key={blog.id} {...blog} />;
          })}
    </div>
  );
};

export default BlogList;
