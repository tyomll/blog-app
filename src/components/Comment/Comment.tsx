import React from 'react';
import s from './Comment.module.scss';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { fetchUserDataById } from '../../utils/userProfileFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from 'firebase/auth';
import { deleteComment } from '../../utils/postFunctions';
import { CommentType } from '../../types/comment.type';
import { SnackbarType } from '../../types/snackbar.type';

interface CommentProps {
  comment: CommentType;
  snackbar: SnackbarType;
  setSnackbar: (arg: SnackbarType) => void;
}
const Comment: React.FC<CommentProps> = ({ comment, snackbar, setSnackbar }) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { text, uid, date, id } = comment as CommentType;
  const [avatar, setAvatar] = React.useState('');
  const [author, setAuthor] = React.useState<any>('');
  function onDeleteComment() {
    deleteComment(id!, snackbar, setSnackbar);
  }
  React.useEffect(() => {
    fetchUserDataById(uid!, setAuthor, setAvatar);
  }, []);
  return (
    <div className={s.comment}>
      <div className={s.authorDetails}>
        <img src={avatar} />
        <div className={s.authorData}>
          <Link to={`/users/${comment.uid}`}>@{author?.username}</Link>
          <span>{formatDistanceToNow(Number(date)) + ' ' + 'ago'}</span>
        </div>
        {currentUser && currentUser.uid === uid && (
          <div className={s.deleteBtn} onClick={onDeleteComment}>
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </div>
        )}
      </div>
      <div className={s.commentText}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
