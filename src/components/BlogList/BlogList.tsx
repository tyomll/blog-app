import React from 'react';
import BlogBlock from '../BlogBlock/BlogBlock';
import BlogBlockSkeleton from '../BlogBlock/Skeleton/BlogBlockSkeleton';
import styles from './BlogList.module.scss';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getPostsFromPostSlice } from '../../utils/fetchFromRedux';
import { PostType } from '../../redux/postsSlice/slice';

interface BlogListProps {
  searchValue: string;
}
const BlogList: React.FC<BlogListProps> = ({ searchValue }) => {
  const posts = useAppSelector((state) => state.posts.items);
  const category = useAppSelector((state) => state.posts.category);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getPostsFromPostSlice(setLoading);
  }, []);

  return (
    <div className={styles.root}>
      {loading &&
        posts.map((_: any, i: any) => {
          return <BlogBlockSkeleton key={i} />;
        })}
      {!loading &&
        posts
          .filter((post: any) => {
            if (category !== 'all') {
              return post.category === category;
            } else {
              return post;
            }
          })
          .filter((post: any) => {
            if (searchValue.trim() !== '') {
              return post.title.toLowerCase().trim().includes(searchValue.trim().toLowerCase());
            } else {
              return post;
            }
          })
          .sort((a: any, b: any) => {
            // Sorting posts by date, DESC
            return b.date - a.date;
          })

          .map((post: any) => {
            return <BlogBlock key={post.id} {...post} />;
          })}
    </div>
  );
};

export default BlogList;
