import React from "react";
import styles from "./BlogBlock.module.scss";
import { Link } from "react-router-dom";

interface BlogBlockProps {
  id: string;
  title: string;
  author: string;
  text: string;
  image: string;
  category: string;
}
const BlogBlock: React.FC<BlogBlockProps> = ({
  id,
  title,
  author,
  text,
  image,
  category,
}) => {
  return (
    <div className={styles.block}>
      <img src={image} />
      <div className={styles.texts}>
        <a>
          <span>Author: </span>
          {author}
        </a>
        <span className={styles.category}>{category}</span>
        <h1>{title}</h1>
        <p>{text.substring(0, 150) + "..."}</p>
        <Link to = {`/blog/${id}`}>
          <button>Read More</button>
        </Link>
      </div>
    </div>
  );
};

export default BlogBlock;
