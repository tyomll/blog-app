import React from 'react';
import s from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>Hi, Welcome back</h1>
      </div>
    </div>
  );
};

export default Header;
