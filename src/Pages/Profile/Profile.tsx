import { current } from '@reduxjs/toolkit';
import { getAuth, updateCurrentUser } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogBlock from '../../components/BlogBlock/BlogBlock';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useAuth } from '../../hooks/use-auth';
import { PostType } from '../../redux/postsSlice/slice';
import { getPostsFromPostSlice } from '../../utils/fetchFromRedux';
import s from './Profile.module.scss';
import { uploadUserAvatar } from '../../utils/userProfileFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import UploadimageModal from '../../components/UploadimageModal/UploadimageModal';

const Profile: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const { email } = useAuth();
  const push = useNavigate();
  const [loading, setLoading] = React.useState(true);
  // const posts = useAppSelector((state) => {
  //   return state.filter((post) => {
  //     return post.author.toLowerCase() === user?.displayName?.toLowerCase();
  //   });
  // });
  const [photo, setPhoto] = React.useState<null | string>(null);
  const [photoURL, setPhotoURL] = React.useState<string>(
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  );
  const refresh = () => window.location.reload();
  const [uploadMode, setUploadMode] = React.useState<boolean>(false);

  function logOutUser() {
    auth.signOut();
    push('/');
  }
  async function handleAvatarSumbit() {
    setUploadMode(false);
    await uploadUserAvatar(photo, user, setLoading);
    refresh();
  }

  React.useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
    getPostsFromPostSlice(setLoading);
  }, [user]);

  return (
    <div className={s.root}>
      {uploadMode && (
        <UploadimageModal
          setPhoto={setPhoto}
          handleAvatarSumbit={handleAvatarSumbit}
          setUploadMode={setUploadMode}
        />
      )}
      {loading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <div className={s.wrapper}>
          <div className={s.userInfo}>
            <div className={s.avatar}>
              <div className={s.image}>
                <img src={photoURL} />
                <button id="uploadFile" onClick={() => setUploadMode(true)}>
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </div>
            </div>
            <div className={s.details}>
              <h1>{user?.displayName}</h1>
              <span>{user?.email}</span>
            </div>
            <div className={s.addPost}>
              
            </div>
          </div>
          <div className={s.userPostsSection}>
            <h1>Posts</h1>
            <div className={s.userPosts}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
