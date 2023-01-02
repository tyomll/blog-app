import React from 'react';
import { useParams } from 'react-router-dom';
import BlogBlock from '../../components/BlogBlock/BlogBlock';
import { PostType } from '../../redux/postsSlice/slice';
import s from './UserPage.module.scss';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getPostsFromPostSlice, getUserFromUserSlice } from '../../utils/fetchFromRedux';

const UserPage: React.FC = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.getUserById.item);
  const [loading, setLoading] = React.useState(true);
  const posts = useAppSelector((state) => {
    return state.posts.items.filter((post) => {
      return post.author.toLowerCase() === user.userName?.toLowerCase();
    });
  });

  React.useEffect(() => {
    getUserFromUserSlice(id, setLoading);
    getPostsFromPostSlice(setLoading);
  }, [id]);

  return (
    <div className={s.root}>
      {loading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <div className={s.wrapper}>
          <div className={s.userInfo}>
            <img src={user.avatar} />
            <h1>{user.userName}</h1>
          </div>
          <div className={s.userPostsSection}>
            <h1>Posts</h1>
            <div className={s.userPosts}>
              {posts &&
                posts.map((post: PostType) => {
                  return <BlogBlock key={post.id} {...post} />;
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
