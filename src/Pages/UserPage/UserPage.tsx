import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogBlock from "../../components/BlogBlock/BlogBlock";
import { fetchPosts } from "../../redux/postsSlice/slice";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchUserById, setItem } from "../../redux/userByIdSlice/slice";
import { PostType } from "../../redux/postsSlice/slice";
import s from "./UserPage.module.scss";

const UserPage: React.FC = () => {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user.item);
  const postsnew = useSelector((state: RootState) => {
    const allPosts = state.posts.items;
    if (user) {
      return allPosts.filter((post) => {
        return post.author.toLowerCase() === user.userName.toLowerCase();
      });
    }
  });
  const dispatch = useDispatch<AppDispatch>();

  async function getUser() {
    if (id) {
      await dispatch(fetchUserById(id));
    }
    dispatch(fetchPosts());
  }

  useEffect(() => {
    getUser();
  }, [id]);

  if (!id) {
    return <h1>Loading</h1>;
  }
  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <div className={s.userInfo}>
          <img src={user.avatar} />
          <h1>{user.userName}</h1>
        </div>
        <div className={s.userPostsSection}>
          <h1>Posts</h1>
          <div className={s.userPosts}>
            {postsnew &&
              postsnew.map((post: PostType) => {
                return <BlogBlock key={post.id} {...post} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
