import { getAuth } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlogBlock from '../../components/BlogBlock/BlogBlock';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getPostsFromPostSlice } from '../../utils/fetchFromRedux';
import s from './Profile.module.scss';
import { uploadUserAvatar } from '../../utils/userProfileFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import UploadimageModal from '../../components/UploadimageModal/UploadimageModal';
import Loader from '../../components/Loader/Loader';
import Avatar from '@mui/joy/Avatar';
import { toPng } from 'html-to-image';
import { PostType } from '../../types/post.type';

const Profile: React.FC = () => {
  const auth = getAuth();
  const user = auth?.currentUser;
  const [loading, setLoading] = React.useState<boolean>(true);
  const posts = useAppSelector((state) => {
    return state.posts.items.filter((post: PostType) => {
      return post.author.id.toLowerCase() === user?.uid?.toLowerCase();
    });
  });
  const [photo, setPhoto] = React.useState<null | string>(null);
  const [photoURL, setPhotoURL] = React.useState<string>('');
  const [uploadMode, setUploadMode] = React.useState<boolean>(false);
  const avatarRef = React.useRef<HTMLDivElement>(null);
  const refresh = () => window.location.reload();

  async function handleAvatarSumbit() {
    setUploadMode(false);
    await uploadUserAvatar(photo, user, setLoading);
    refresh();
  }

  async function setUserDefaultAvatar() {
    if (avatarRef.current === null) {
      return;
    }
    await toPng(avatarRef.current, { cacheBust: true })
      .then(async (dataUrl) => {
        await uploadUserAvatar(dataUrl, user, setLoading);
        refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
    getPostsFromPostSlice(setLoading);
  }, [user]);

  React.useEffect(() => {
    if (user?.photoURL === null) {
      setUserDefaultAvatar();
    }
  });

  if (loading) return <Loader />;
  return (
    <div className={s.root} style={{ overflowY: uploadMode ? 'hidden' : 'initial' }}>
      {uploadMode && (
        <UploadimageModal
          setPhoto={setPhoto}
          handleAvatarSumbit={handleAvatarSumbit}
          setUploadMode={setUploadMode}
        />
      )}
      <div className={s.wrapper}>
        <div className={s.userInfo}>
          <div className={s.avatar}>
            <div className={s.image}>
              {photoURL === '' ? (
                <Avatar
                  ref={avatarRef}
                  variant="outlined"
                  sx={{
                    fontSize: '70px',
                    '--Avatar-size': '200px',
                  }}>
                  {user?.displayName?.slice(0, 1).toUpperCase()}
                </Avatar>
              ) : (
                <img src={photoURL} />
              )}
              <button id="uploadFile" onClick={() => setUploadMode(true)}>
                <FontAwesomeIcon icon={faCamera} />
              </button>
            </div>
          </div>
          <div className={s.details}>
            <h1>@{user?.displayName}</h1>
            <span>{user?.email}</span>
          </div>
          <Link to="/create-post" className={s.addPost}>
            <FontAwesomeIcon icon={faBullhorn} />
            Add post
          </Link>
        </div>
        <div className={s.userPostsSection}>
          <h1>Posts</h1>
          <div className={s.userPosts}>
            {posts &&
              posts
                .sort((a: any, b: any) => {
                  return b.date - a.date;
                })
                .map((post: any) => {
                  return <BlogBlock key={post.id} {...post} />;
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
