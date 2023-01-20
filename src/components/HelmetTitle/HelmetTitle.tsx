import React from 'react';
import Helmet from 'react-helmet';

interface HelmetTitleProps {
  title: string;
}
const HelmetTitle: React.FC<HelmetTitleProps> = ({ title }) => {
  return (
    <div>
      <Helmet>
        <title>Tyom Blog | {title}</title>
      </Helmet>
    </div>
  );
};

export default HelmetTitle;
