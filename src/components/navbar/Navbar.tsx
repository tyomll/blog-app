import React from 'react';
import styles from './Navbar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { getAuth } from 'firebase/auth';

const Navbar: React.FC = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  const push = useNavigate();
  function logOutUser() {
    const auth = getAuth();
    auth.signOut();
    push('/');
  }

  return (
    <div className={styles.root}>
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

            <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" />
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
