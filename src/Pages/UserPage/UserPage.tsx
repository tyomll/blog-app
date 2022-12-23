import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogBlock from "../../components/BlogBlock/BlogBlock";
import { fetchPosts } from "../../redux/postsSlice/slice";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchUserById, setItem } from "../../redux/getUserByIdSlice/slice";
import { PostType } from "../../redux/postsSlice/slice";
import s from "./UserPage.module.scss";

const UserPage: React.FC = () => {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.getUserById.item);
  const posts = useSelector((state: RootState) => {
    return state.posts.items.filter((post) => {
      return post.author.toLowerCase() === user.userName?.toLowerCase();
    });
  });
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = React.useState(true);

  async function getUser() {
    setLoading(true);
    if (id) {
      await dispatch(fetchUserById(id));
    }
    setLoading(false);
  }
  async function getPosts() {
    setLoading(true);
    await dispatch(fetchPosts());
    setLoading(false);
  }

  useEffect(() => {
    getUser();
    getPosts()
  }, [id]);
  return (
    <div className={s.root}>
      {loading && <div>Loading</div>}
      <div className={s.wrapper}>
        <div className={s.userInfo}>
          <img src={user.avatar} />
          <h1>{user.userName}</h1>
        </div>
        <div className={s.userPostsSection}>
          <h1>Posts</h1>
          <div className={s.userPosts}>
            {posts &&
              posts.map((post: PostType) => {
                return <BlogBlock key={post.id} {...post} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
