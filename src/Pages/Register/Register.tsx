import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../redux/userSlice/slice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import LoginRegisterForm from '../../components/LoginRegisterForm/LoginRegisterForm';
import s from './Register.module.scss';

const content = {
  type: 'reg',
  formHeading: 'Be part of our community',
  buttonText: 'Sign up',
  recommendationText: 'Already have an account?',
};
const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const push = useNavigate();

  function handleRegister(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
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
      <LoginRegisterForm content={content} submitHandler={handleRegister} />
    </div>
  );
};

export default Register;
