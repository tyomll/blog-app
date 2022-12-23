import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Link, useParams } from 'react-router-dom';
import { fetchPostById } from '../../redux/blogByIdSlice/slice';
import { AppDispatch, RootState } from '../../redux/store';
import s from './PostPage.module.scss';

const PostPage: React.FC = () => {
  const { id } = useParams();
  const post = useAppSelector((state) => state.post.item);
  const dispatch = useAppDispatch();

  const getPostById = async () => {
    if (id) {
      await dispatch(fetchPostById(id));
    }
  };
  useEffect(() => {
    getPostById();
  }, []);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.postImage}>
          <img src={post.image} />
        </div>
        <div className={s.description}>
          <h1>{post.title}</h1>
          <Link to={`/users/${post.authorId}`}>
            <span>Author: </span>
            {post.author}
          </Link>
          <span className={s.category}>{post.category}</span>
          <p>{post.text}</p>
        </div>
      </div>
      <div className={s.commentsWrapper}>
        <h1>Comments</h1>
        <div className={s.comments}>
          {post.comments &&
            post.comments.map((comment) => {
              return (
                <div key={comment.id} className={s.comment}>
                  <div className={s.authorData}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" />
                    <p>{comment.author}</p>
                  </div>
                  <div className={s.commentText}>
                    <p>{comment.text}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={s.commentInput}>
          <textarea placeholder="Leave your thoughts..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
