import React from 'react';
import BlogBlock from '../BlogBlock/BlogBlock';
import BlogBlockSkeleton from '../BlogBlock/Skeleton/BlogBlockSkeleton';
import styles from './BlogList.module.scss';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getPostsFromPostSlice } from '../../utils/fetchFromRedux';
import PostsNotFound from '../PostsNotFound/PostsNotFound';
import { PostType } from '../../types/post.type';

interface BlogListProps {
  searchValue: string;
}
const BlogList: React.FC<BlogListProps> = ({ searchValue }) => {
  const posts = useAppSelector((state) => state.posts.items);
  const category = useAppSelector((state) => state.posts.category);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [noPosts, setNoPosts] = React.useState<boolean>(false);

  async function fetchPosts() {
    setLoading(true);
    await getPostsFromPostSlice(setLoading);
    setLoading(false);
  }
  React.useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <PostsNotFound />;
  }

  return (
    <div className={styles.root}>
      {loading &&
        posts.map((_: PostType, i: number) => {
          return <BlogBlockSkeleton key={i} />;
        })}
      {!loading &&
        posts
          .filter((post: PostType) => {
            if (category !== 'all') {
              return post.category === category;
            } else {
              return post;
            }
          })
          .filter((post: PostType) => {
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

          .map((post: PostType) => {
            return <BlogBlock key={post.id} {...post} />;
          })}
    </div>
  );
};

export default BlogList;
