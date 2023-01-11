import React from 'react';
import s from './BlogBlock.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { PostType, setCategory } from '../../redux/postsSlice/slice';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDeletePosts } from '../../hooks/posts';
import { Alert, Slide, Snackbar } from '@mui/material';
import parse from 'html-react-parser';
import { useAppDispatch } from '../../hooks/redux-hooks';

const BlogBlock: React.FC<PostType> = ({ id, author, title, text, image, category, date }) => {
  const dispatch = useAppDispatch();
  const [snackbar, showSnackbar] = React.useState<boolean>(false);
  const [snackbarText, setSnackbarText] = React.useState<string>(
    'Your comment added successfully!',
  );
  const refresh = () => window.location.reload();
  const { deletePost } = useDeletePosts(id, showSnackbar, setSnackbarText, refresh);
  const location = useLocation();

  return (
    <div className={s.block}>
      <div className={s.image}>
        <img src={image} />
      </div>
      <div className={s.content}>
        <div className={s.author}>
          <div className={s.info}>
            <h1>{title.slice(0, 15) + '...'}</h1>
            <span>Author: </span>
            <Link to={`/users/${author.id}`}>{author.name}</Link>
          </div>
          {location.pathname === '/profile' && (
            <div className={s.delete}>
              <FontAwesomeIcon icon={faTrashAlt} onClick={deletePost}></FontAwesomeIcon>
            </div>
          )}
        </div>
        <span className={s.category} onClick={() => dispatch(setCategory(category.toLowerCase()))}>
          {category}
        </span>
        <div className={s.texts}>
          <div className={s.description}>{text && parse(text.slice(0, 130) + '...')}</div>
        </div>
        <div className={s.button}>
          <Link to={`/blog/${id}`}>
            <button>Read More</button>
          </Link>
          <span>{formatDistanceToNow(date) + ' ' + 'ago'}</span>
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

export default BlogBlock;
