import React from 'react';
import s from './PostCreating.module.scss';

const PostCreating: React.FC = () => {
  const onPost = () => {};
  return (
    <div>
      <input type="text" />
      <button onClick={onPost}>Post</button>
    </div>
  );
};

export default PostCreating;
