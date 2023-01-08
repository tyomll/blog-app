import React from 'react';
import './Loader.scss';

const Loader: React.FC = () => {
  return (
    <div className="loader-wrapper">
      <div className="lds-dual-ring"></div>;
    </div>
  );
};

export default Loader;
