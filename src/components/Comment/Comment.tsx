import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { fetchUserDataById } from '../../utils/userProfileFunctions';
import s from './Comment.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from 'firebase/auth';
import { deleteComment } from '../../utils/postFunctions';

interface CommentType {
  comment: any;
  showSnackbar: (arg: boolean) => void;
  setSnackbarText: (arg: string) => void;
}
const Comment: React.FC<CommentType> = ({ comment, showSnackbar, setSnackbarText }) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { text, uid, date, id } = comment;
  const [avatar, setAvatar] = React.useState('');
  const [author, setAuthor] = React.useState<any>('');
  function onDeleteComment() {
    deleteComment(id, showSnackbar, setSnackbarText);
  }
  React.useEffect(() => {
    fetchUserDataById(uid, setAuthor, setAvatar);
  }, []);
  return (
    <div className={s.comment}>
      <div className={s.authorDetails}>
        <img src={avatar} />
        <div className={s.authorData}>
          <Link to={`/users/${comment.uid}`}>@{author?.username}</Link>
          <span>{formatDistanceToNow(date) + ' ' + 'ago'}</span>
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
