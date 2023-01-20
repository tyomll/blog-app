import React from 'react';
import { Link } from 'react-router-dom';
import s from './LoginRegisterForm.module.scss';
import logo from '../../images/logo.png';
import { SnackbarType } from '../../types/snackbar.type';
import { Alert, Slide, Snackbar } from '@mui/material';
import HelmetTitle from '../../components/HelmetTitle/HelmetTitle';

type contentType = {
  type: string;
  formHeading: string;
  buttonText: string;
  recommendationText: string;
};

interface LoginRegisterFormType {
  content: contentType;
  submitHandler: (username: string | null, email: string, pass: string) => void;
}

const activeButtonStyle = 'linear-gradient(305deg, #fe9344, #fecd20)';

const LoginRegisterForm: React.FC<LoginRegisterFormType> = ({ content, submitHandler }) => {
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [pass, setPass] = React.useState<string>('');
  const [passTwo, setPassTwo] = React.useState<string>('');
  const [snackbar, setSnackbar] = React.useState<SnackbarType>({
    show: false,
    text: '',
    status: 'success',
  });
  return (
    <div className={s.wrapper}>
      <HelmetTitle title={content.type === 'reg' ? 'Sign Up' : 'Sign In'} />
      <div className={s.texts}>
        <div className={s.textsContainer}>
          <div className={s.heading}>
            <div className={s.logo}>
              <img src={logo} alt="logo" />
            </div>
          </div>
          <p>Here could be your advertisement😁</p>
        </div>
      </div>
      <div className={s.loginForm}>
        <div className={s.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={s.heading}>
          <h1>{content.formHeading}</h1>
        </div>
        <div className={s.inputs}>
          {content.type === 'reg' && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          {content.type === 'reg' && (
            <input
              type="password"
              placeholder="Password Confirmation"
              value={passTwo}
              onChange={(e) => setPassTwo(e.target.value)}
            />
          )}
        </div>
        <div className={s.submitBtn}>
          <button
            style={{
              backgroundImage:
                content.type === 'reg'
                  ? username && email && pass && passTwo
                    ? activeButtonStyle
                    : ''
                  : email && pass
                  ? activeButtonStyle
                  : '',
              color: email && pass ? 'white' : '',
            }}
            onClick={() => {
              if (content.type === 'reg') {
                if (
                  username.trim() !== '' &&
                  email.trim() !== '' &&
                  pass.trim() !== '' &&
                  passTwo.trim() !== ''
                ) {
                  if (pass.trim() === passTwo.trim()) {
                    setSnackbar({
                      ...snackbar,
                      show: true,
                      text: 'You are registered successfully!',
                      status: 'success',
                    });
                    submitHandler(username, email, pass);
                  } else {
                    setSnackbar({
                      ...snackbar,
                      show: true,
                      text: 'Passwords do not match. Please try again.',
                      status: 'error',
                    });
                  }
                } else if (
                  username.trim() === '' ||
                  email.trim() === '' ||
                  pass.trim() === '' ||
                  passTwo.trim() === ''
                ) {
                  setSnackbar({
                    ...snackbar,
                    show: true,
                    text: 'You must fill all fields.',
                    status: 'error',
                  });
                } else {
                  setSnackbar({
                    ...snackbar,
                    show: true,
                    text: 'Email is already in use.',
                    status: 'error',
                  });
                }
              } else {
                if (email.trim() !== '' && pass.trim() !== '') {
                  setSnackbar({
                    ...snackbar,
                    show: true,
                    text: 'You are logged in successfully!',
                    status: 'success',
                  });
                  submitHandler(null, email, pass);
                } else if (email.trim() === '' && pass.trim() === '') {
                  setSnackbar({
                    ...snackbar,
                    show: true,
                    text: 'You must fill all fields.',
                    status: 'error',
                  });
                } else {
                  setSnackbar({
                    ...snackbar,
                    show: true,
                    text: 'Email or password is incorrect.',
                    status: 'error',
                  });
                }
              }
            }}>
            {content.buttonText}
          </button>
        </div>
        <div className={s.registerLink}>
          <p>
            {content.recommendationText}{' '}
            <Link to={content.type === 'reg' ? '/login' : '/register'}>
              {content.type === 'reg' ? 'Log in' : 'Register'}
            </Link>
          </p>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbar.show}
        onClose={() => setSnackbar({ ...snackbar, show: false })}
        message={snackbar.text}
        TransitionComponent={Slide}
        autoHideDuration={3000}
        key={'bottom' + 'center'}>
        <Alert severity={snackbar.status}>{snackbar.text}</Alert>
      </Snackbar>
    </div>
  );
};

export default LoginRegisterForm;
