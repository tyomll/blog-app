import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/blogSlice/slice';
import { AppDispatch, RootState } from '../../redux/store';
import BlogBlock from '../BlogBlock/BlogBlock';
import BlogBlockSkeleton from '../BlogBlock/Skeleton/BlogBlockSkeleton';
import styles from './BlogList.module.scss';

interface BlogListProps {
  searchValue: string;
}
const BlogList: React.FC<BlogListProps> = ({ searchValue }) => {
  const blogs = useSelector((state: RootState) => state.blogs.items);
  const dispatch = useDispatch<AppDispatch>();
  const category = useSelector((state: RootState) => state.blogs.category);
  const [loading, setLoading] = React.useState(true);
  async function getBlogs() {
    setLoading(true);
    await dispatch(fetchBlogs());
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
