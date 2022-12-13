import React from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className={styles.root}>
      <nav>
        <Link to="/">Home</Link>
        <div className={styles.navRight}>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
