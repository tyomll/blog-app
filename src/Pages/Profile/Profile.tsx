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
const Profile = () => {
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
  const [photo, setPhoto] = React.useState<File | null>(null);
  const [photoURL, setPhotoURL] = React.useState(
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000',
  );
  const refresh = () => window.location.reload();
  function logOutUser() {
    auth.signOut();
    push('/');
  }
  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e?.target.files) {
      setPhoto(e.target.files[0]);
    }
  }
  async function handleAvatarSumbit() {
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
      {loading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <div className={s.wrapper}>
          <div className={s.userInfo}>
            <div className={s.avatar}>
              <div className={s.image}>
                <img src={photoURL} />
                <label htmlFor="uploadFile">
                  <FontAwesomeIcon icon={faCamera} />
                </label>
                <input type="file" id="uploadFile" onChange={(event) => handleImageChange(event)} />
              </div>
              <button onClick={handleAvatarSumbit}>submit</button>
            </div>
            <h1>{user?.displayName}</h1>
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
