import { current } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogBlock from '../../components/BlogBlock/BlogBlock';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useAuth } from '../../hooks/use-auth';
import { PostType } from '../../redux/postsSlice/slice';
import { getPostsFromPostSlice } from '../../utils/fetchFromRedux';
import s from './Profile.module.scss';

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { email } = useAuth();
  const push = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const posts = useAppSelector((state) => {
    return state.posts.items.filter((post) => {
      return post.author.toLowerCase() === user?.displayName?.toLowerCase();
    });
  });
  function logOutUser() {
    auth.signOut();
    push('/');
  }
  React.useEffect(() => {
    getPostsFromPostSlice(setLoading);
  }, []);

  return (
    <div className={s.root}>
      <button onClick={logOutUser}>fsdaf</button>
      {loading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <div className={s.wrapper}>
          <div className={s.userInfo}>
            {user?.photoURL !== null && <img src={user?.photoURL} />}
            <h1>{user?.displayName}</h1>
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

export default Profile;
