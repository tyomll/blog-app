import React from 'react';
import { format } from 'date-fns';
import s from './PostBlock.module.scss';

interface PostBlockProps {
  title: string;
  image: string;
  author: {
    id: string;
    name: string;
  };
  category: string;
  date: string | number;
}

const PostBlock: React.FC<PostBlockProps> = ({ title, image, author, category, date }) => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.checkbox}>
          <div className={s.checkboxContainer}>
            <input type="checkbox" />
          </div>
        </div>
        <div className={s.image}>
          <img src={image} alt="post-image" />
        </div>
        <div className={s.title}>
          <span>{title}</span>
        </div>
        <div className={s.author}>
          <span>{author.name}</span>
        </div>
        <div className={s.category}>
          <span>{category}</span>
        </div>
        <div className={s.date}>
          <span>{format(Number(date), 'yyyy.MM.dd')}</span>
        </div>
      </div>
    </div>
  );
};

export default PostBlock;
