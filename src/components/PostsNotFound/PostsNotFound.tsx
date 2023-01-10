import React from 'react';
import { Link } from 'react-router-dom';
import s from './PostsNotFound.module.scss';

const PostsNotFound: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.image}>
          <img src="https://o.remove.bg/downloads/816f3cc5-eb66-4ba1-8455-5695fff2a8b8/young-woman-checking-security-password-virsual-folder-isometric-illustration_1150-37274-removebg-preview.png" />
        </div>
        <div className={s.text}>
          <h1>Nothing was found!</h1>
          <span>
            Currently there are no posts in this blog. Click <Link to="/create-post">here</Link> to
            add them.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostsNotFound;
