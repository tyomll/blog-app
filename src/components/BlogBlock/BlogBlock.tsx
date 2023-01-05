import React from 'react';
import s from './BlogBlock.module.scss';
import { Link } from 'react-router-dom';

interface BlogBlockProps {
  id: string;
  author: { name: string; id: string };
  title: string;
  text: string;
  image: string;
  category: string;
}
const BlogBlock: React.FC<BlogBlockProps> = ({ id, author, title, text, image, category }) => {
  return (
    <div className={s.block}>
      <div className={s.image}>
        <img src={image} />
      </div>

      <div className={s.texts}>
        <span>Author: </span>
        <Link to={`/users/${author.id}`}>{author.name}</Link>
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
