import React from "react";
import styles from './BlogBlock.module.scss'

interface BlogBlockProps {
  id: string;
  title: string;
  author: string;
  text: string;
  image : string;
} 
const BlogBlock: React.FC<BlogBlockProps> = ({ title, author, text, image }) => {
  return (
    <div className={styles.block}>
      <h1>{title}</h1>
      <a>{author}</a>
      <p>{text}</p>
      <img src={image} />
    </div>
  );
};

export default BlogBlock;
