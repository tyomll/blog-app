import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../redux/userSlice/slice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
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
    <div>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <button
        onClick={(e) => {
          handleRegister(email, pass);
        }}>
        register
      </button>
    </div>
  );
};

export default Register;
