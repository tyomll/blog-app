import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import s from './PostPage.module.scss';
import { getPostById } from '../../utils/fetchFromRedux';
import { addComment } from '../../utils/postFunctions';
import { Auth, getAuth } from 'firebase/auth';
import CommentsList from '../../components/CommentsList/CommentsList';
import { Alert, Snackbar } from '@mui/material';
import Slide from '@mui/material/Slide';
import parse from 'html-react-parser';
import { getUserAvatar } from '../../utils/userProfileFunctions';
import { format } from 'date-fns';
import { setCategory } from '../../redux/postsSlice/slice';
import { CommentType } from '../../types/comment.type';
import { SnackbarType } from '../../types/snackbar.type';

const PostPage: React.FC = () => {
  const { id } = useParams();
  const auth: Auth = getAuth();
  const post = useAppSelector((state) => state.post.item);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [authorAvatar, setAuthorAvatar] = React.useState('');
  const [snackbar, setSnackbar] = React.useState<SnackbarType>({
    show: false,
    text: '',
    status: 'success',
  });
  const [comment, setComment] = React.useState<CommentType>({
    postId: id as string,
    text: '',
  });
  const commmentsDiv = React.useRef<null | HTMLDivElement>(null);

  const handleCommentAdd = () => {
    setComment({ ...comment, text: '' });
    if (comment.text?.trim() !== '') {
      const userId = auth.currentUser?.uid;
      if (comment) addComment(comment.text!, comment.postId!, userId, snackbar, setSnackbar);
    } else {
      setSnackbar({ ...snackbar, show: true, text: 'Please fill text field.', status: 'error' });
    }
  };

  async function getPost() {
    await getPostById(id);
  }
  useEffect(() => {
    getPost();
  }, [id]);

  useEffect(() => {
    if (post.id) {
      getUserAvatar(post.author?.id, setAuthorAvatar);
    }
  }, [post]);
  useEffect(() => {
    commmentsDiv.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comment]);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.postImage}>
          <img src={post.image} />
        </div>
        <div className={s.description}>
          <div className={s.postInfo}>
            <h1>{post.title}</h1>
            <div className={s.author}>
              {post.author && (
                <Link to={`/users/${post.author.id}`}>
                  <img src={authorAvatar} alt="avatar" />
                  <span>{post.author && post.author.name}</span>
                </Link>
              )}
              <span>
                {post.date && '| Published -  ' + format(Number(post.date), 'yyyy.MM.dd')}
              </span>
            </div>
            <span
              className={s.category}
              onClick={() => {
                dispatch(setCategory(post.category.toLowerCase()));
                navigate('/');
              }}>
              {post.category}
            </span>
          </div>
          <div className={s.content}>{post.text && parse(post.text)}</div>
        </div>
      </div>
      <div className={s.commentsWrapper}>
        <h1>Comments</h1>
        <div className={s.comments}>
          {id && <CommentsList postId={id} snackbar={snackbar} setSnackbar={setSnackbar} />}
        </div>
        <div className={s.commentInput} ref={commmentsDiv}>
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
        open={snackbar.show}
        onClose={() => setSnackbar({ ...snackbar, show: false })}
        message={snackbar.text}
        TransitionComponent={Slide}
        autoHideDuration={3000}
        key={'bottom' + 'center'}>
        <Alert severity={snackbar.status}>{snackbar.text}</Alert>
      </Snackbar>
    </div>
  );
};

export default PostPage;
