import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Link, useParams } from 'react-router-dom';
import s from './PostPage.module.scss';
import { getPostById } from '../../utils/fetchFromRedux';
import { updatePost } from '../../utils/postFunctions';
import uuid from 'react-uuid';
import { getAuth } from 'firebase/auth';

const PostPage: React.FC = () => {
  const { id } = useParams();
  const post = useAppSelector((state) => state.post.item);
  const [comments, setComments] = React.useState({
    id: uuid(),
    text: '',
  });
  const handleCommentAdd = () => {
    if (id) updatePost(id, comments);
  };
  const auth: any = getAuth();
  useEffect(() => {
    getPostById(id);
  }, []);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.postImage}>
          <img src={post.image} />
        </div>
        <div className={s.description}>
          <h1>{post.title}</h1>
          {post.author && (
            <Link to={`/users/${post.author.id}`}>
              <span>Author: </span>
              {post.author && post.author.name}
            </Link>
          )}
          <span className={s.category}>{post.category}</span>
          <p>{post.text}</p>
        </div>
      </div>
      <div className={s.commentsWrapper}>
        <h1>Comments</h1>
        <div className={s.comments}>
          {post.comments &&
            post.comments?.map((comment: any) => {
              return (
                <div key={comment.id} className={s.comment}>
                  <div className={s.authorData}>
                    <img src={auth.currentUser.photoURL} />
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
          <textarea
            placeholder="Leave your thoughts..."
            value={comments.text}
            onChange={(e) => setComments({ ...comments, text: e.target.value })}
          />
          <button onClick={handleCommentAdd}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
