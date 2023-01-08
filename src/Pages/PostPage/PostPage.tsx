import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { Link, useParams } from 'react-router-dom';
import s from './PostPage.module.scss';
import { getPostById } from '../../utils/fetchFromRedux';
import { addComment } from '../../utils/postFunctions';
import { getAuth } from 'firebase/auth';
import CommentsList from '../../components/CommentsList/CommentsList';
import { Alert, Snackbar } from '@mui/material';
import Slide from '@mui/material/Slide';

const PostPage: React.FC = () => {
  const { id } = useParams();
  const auth: any = getAuth();
  const post = useAppSelector((state) => state.post.item);
  const [snackbar, showSnackbar] = React.useState<boolean>(false);
  const [snackbarText, setSnackbarText] = React.useState<string>(
    'Your comment added successfully!',
  );
  const [comment, setComment] = React.useState({
    postId: id as string,
    text: '',
  });

  const handleCommentAdd = () => {
    setComment({ ...comment, text: '' });
    if (comment.text.trim() !== '') {
      const userId = auth.currentUser?.uid;
      if (comment) addComment(comment.text, comment.postId, userId, showSnackbar, setSnackbarText);
    } else {
      showSnackbar(true);
      setSnackbarText('Please fill text field.');
    }
  };

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
          {id && (
            <CommentsList
              postId={id}
              showSnackbar={showSnackbar}
              setSnackbarText={setSnackbarText}
            />
          )}
        </div>
        <div className={s.commentInput}>
          <textarea
            placeholder="Leave your thoughts..."
            value={comment.text}
            onChange={(e) => setComment({ ...comment, text: e.target.value })}
          />
          <button onClick={handleCommentAdd}>Send</button>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbar}
        onClose={() => showSnackbar(false)}
        message={snackbarText}
        TransitionComponent={Slide}
        autoHideDuration={3000}
        key={'bottom' + 'center'}>
        <Alert
          severity={
            snackbarText === 'Your comment added successfully!' || 'Comment deleted successfully!'
              ? 'success'
              : 'error'
          }>
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PostPage;
