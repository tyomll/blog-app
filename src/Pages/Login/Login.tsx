import React from 'react';
import s from './Login.module.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../redux/userSlice/slice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import LoginRegisterForm from '../../components/LoginRegisterForm/LoginRegisterForm';

const content = {
  type: 'log',
  formHeading: 'Enter your email and password to sign up',
  buttonText: 'Sign in',
  recommendationText: "Don't have an account yet?",
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const push = useNavigate();

  function handleLogin(username: string | null, email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      dispatch(
        setUser({
          username: user.displayName,
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        }),
      );
      push('/profile');
    });
  }
  return (
    <div className={s.root}>
      <LoginRegisterForm content={content} submitHandler={handleLogin} />
    </div>
  );
};

export default Login;
