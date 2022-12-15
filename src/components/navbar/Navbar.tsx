import React from 'react';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
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
        <div className={styles.loginLinks}>
          <Link to="/login">Log in</Link>
          <Link to="/register" className={styles.register}>
            Start Free Trial
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
