import React from 'react';
import s from './Login.module.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../redux/userSlice/slice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
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
      <div className={s.wrapper}>
        <div className={s.loginForm}>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          <button onClick={() => handleLogin(email, pass)}>fdsf</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
