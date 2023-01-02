import React from 'react';
import s from './BlogBlock.module.scss';
import { Link } from 'react-router-dom';

interface BlogBlockProps {
  id: string;
  authorId: string;
  title: string;
  author: string;
  text: string;
  image: string;
  category: string;
}
const BlogBlock: React.FC<BlogBlockProps> = ({
  id,
  authorId,
  title,
  author,
  text,
  image,
  category,
}) => {
  return (
    <div className={s.block}>
      <img src={image} />
      <div className={s.texts}>
        <span>Author: </span>
        <Link to={`/users/${authorId}`}>{author}</Link>
        <span className={s.category}>{category}</span>
        <h1>{title}</h1>
        <p>{text.substring(0, 150) + '...'}</p>
        <Link to={`/blog/${id}`}>
          <button>Read More</button>
        </Link>
      </div>
    </div>
  );
};

export default BlogBlock;
