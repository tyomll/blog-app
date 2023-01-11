import React from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setUser } from '../../redux/userSlice/slice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import LoginRegisterForm from '../../components/LoginRegisterForm/LoginRegisterForm';
import s from './Register.module.scss';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const content = {
  type: 'reg',
  formHeading: 'Be part of our community',
  buttonText: 'Sign up',
  recommendationText: 'Already have an account?',
};
const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleRegister(username: string | null, email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(async ({ user }) => {
      const ref = doc(db, 'users', user.uid);
      await setDoc(ref, { createdAt: Date.now().toString(), username, email });
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: username });
      }
      dispatch(
        setUser({
          username: user.displayName,
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        }),
      );
      navigate('/profile');
    });
  }
  return (
    <div className={s.root}>
      <LoginRegisterForm content={content} submitHandler={handleRegister} />
    </div>
  );
};

export default Register;
