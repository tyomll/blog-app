import React from 'react';
import s from './Login.module.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../redux/userSlice/slice';
import { Link, useNavigate } from 'react-router-dom';
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

  function handleLogin(email: string, password: string) {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        }),
      );
      push('/');
    });
  }
  return (
    <div className={s.root}>
      <LoginRegisterForm content={content} submitHandler={handleLogin} />
    </div>
  );
};

export default Login;
