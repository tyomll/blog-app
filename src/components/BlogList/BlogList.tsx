import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../redux/blogSlice/slice";
import { AppDispatch, RootState } from "../../redux/store";
import BlogBlock from "../BlogBlock/BlogBlock";
import styles from "./BlogList.module.scss";

const BlogList: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.blogs.items);
  const dispatch = useDispatch<AppDispatch>();

  function getBlogs() {
    dispatch(fetchBlogs());
  }
  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className={styles.root}>
      {blogs.map((blog) => {
        return <BlogBlock key={blog.id} {...blog} />;
      })}
    </div>
  );
};

export default BlogList;
