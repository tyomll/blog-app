import React from 'react';
import { fetchPosts } from '../../redux/postsSlice/slice';
import BlogBlock from '../BlogBlock/BlogBlock';
import BlogBlockSkeleton from '../BlogBlock/Skeleton/BlogBlockSkeleton';
import styles from './BlogList.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
interface BlogListProps {
  searchValue: string;
}
const BlogList: React.FC<BlogListProps> = ({ searchValue }) => {
  const blogs = useAppSelector((state) => state.posts.items);
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.posts.category);
  const [loading, setLoading] = React.useState(true);

  async function getBlogs() {
    setLoading(true);
    await dispatch(fetchPosts());
    setLoading(false);
  }
  React.useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className={styles.root}>
      {loading &&
        blogs.map((_, i) => {
          return <BlogBlockSkeleton key={i} />;
        })}
      {!loading &&
        blogs
          .filter((blog) => {
            if (category !== 'all') {
              return blog.category === category;
            } else {
              return blog;
            }
          })

          .filter((blog) => {
            if (searchValue.trim() !== '') {
              return blog.title.toLowerCase().trim().includes(searchValue.trim().toLowerCase());
            } else {
              return blog;
            }
          })
          .map((blog) => {
            return <BlogBlock key={blog.id} {...blog} />;
          })}
    </div>
  );
};

export default BlogList;
