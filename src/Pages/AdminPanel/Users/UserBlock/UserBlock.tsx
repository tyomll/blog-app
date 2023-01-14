import React from 'react';
import { format } from 'date-fns';
import { getUserAvatar } from '../../../../utils/userProfileFunctions';
import s from './UserBlock.module.scss';

interface UserBlockProps {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

const UserBlock: React.FC<UserBlockProps> = ({ id, username, email, createdAt }) => {
  const [userAvatar, setUserAvatar] = React.useState('');

  React.useEffect(() => {
    getUserAvatar(id, setUserAvatar);
  }, []);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.checkbox}>
          <div className={s.checkboxContainer}>
            <input type="checkbox" />
          </div>
        </div>
        <div className={s.avatar}>
          <img src={userAvatar} alt="avatar" />
        </div>
        <div className={s.username}>
          <span>{username}</span>
        </div>
        <div className={s.email}>
          <span>{email}</span>
        </div>
        <div className={s.date}>
          <span>{format(Number(createdAt), 'yyyy.mm.dd')}</span>
        </div>
      </div>
    </div>
  );
};

export default UserBlock;
