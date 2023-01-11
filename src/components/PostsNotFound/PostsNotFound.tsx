import React from 'react';
import { Link } from 'react-router-dom';
import s from './PostsNotFound.module.scss';
import notFound from '../../images/nothing-found.jpg';

const PostsNotFound: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.image}>
          <img src={notFound} />
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
