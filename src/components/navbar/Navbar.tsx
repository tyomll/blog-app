import React from 'react';
import styles from './Navbar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { getAuth } from 'firebase/auth';

const Navbar: React.FC = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  const push = useNavigate();
  const auth: any = getAuth();

  function logOutUser() {
    auth.signOut();
    push('/');
  }

  return (
    <div
      className={styles.root}
      style={{ display: location.pathname === '/admin' ? 'none' : 'flex' }}>
      <nav>
        <div className={styles.logo}>
          <Link to="/">HOME</Link>
        </div>
        <div className={styles.navLinks}>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
        </div>
        {!isAuth ? (
          <div className={styles.loginLinks}>
            <Link to="/login">Log in</Link>
            <Link to="/register" className={styles.register}>
              Start Free Trial
            </Link>
          </div>
        ) : (
          <Link to="/profile" className={styles.profileLinks}>
            {location.pathname === '/profile' ? (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  logOutUser();
                }}>
                Logout
              </span>
            ) : (
              <span>My Profile</span>
            )}

            {auth && <img src={auth.currentUser.photoURL} />}
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
