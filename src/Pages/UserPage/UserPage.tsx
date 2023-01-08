import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { fetchUserDataById } from '../../utils/userProfileFunctions';
import BlogBlock from '../../components/BlogBlock/BlogBlock';
import { PostType } from '../../redux/postsSlice/slice';
import s from './UserPage.module.scss';

const UserPage: React.FC = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.getUserById.item);
  const posts = useAppSelector((state) => {
    return state.posts.items.filter((post: PostType) => {
      return post.author.id.toLowerCase() === id?.toLowerCase();
    });
  });
  const [imageURL, setImageURL] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(true);
  const push = useNavigate();

  function getUserData() {
    if (id) {
      fetchUserDataById(id, setImageURL, setLoading, push);
    }
  }
  React.useEffect(() => {
    getUserData();
  }, [id]);

  return (
    <div className={s.root}>
      {loading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <div className={s.wrapper}>
          <div className={s.userInfo}>
            <div className={s.image}>{imageURL && <img src={imageURL} />}</div>

            {user && (
              <div className={s.details}>
                <h1>{user.username}</h1>
                <span>{user.email}</span>
              </div>
            )}
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
