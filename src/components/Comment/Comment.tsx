import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { fetchUserDataById } from '../../utils/userProfileFunctions';
import s from './Comment.module.scss';

interface CommentType {
  comment: any;
}
const Comment: React.FC<CommentType> = ({ comment }) => {
  const author = useAppSelector((state) => state.getUserById.item);
  const { text, uid, date } = comment;
  const [avatar, setAvatar] = React.useState('');

  React.useEffect(() => {
    fetchUserDataById(uid, setAvatar);
  }, []);

  return (
    <div className={s.comment}>
      <div className={s.authorDetails}>
        <img src={avatar} />
        <div className={s.authorData}>
          <Link to={`/users/${comment.uid}`}>@{author.username}</Link>
          <span>{formatDistanceToNow(date) + ' ' + 'ago'}</span>
        </div>
      </div>
      <div className={s.commentText}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
