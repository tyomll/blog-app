import React from 'react';
import { format } from 'date-fns';
import { getUserAvatar } from '../../../../utils/userProfileFunctions';
import s from './UserBlock.module.scss';
import { Alert, Slide, Snackbar } from '@mui/material';
import { useDeleteUsers } from '../../../../hooks/useUsers';
import MenuPopup from '../../../../components/MenuPopup/MenuPopup';
import EditModal from '../../../../components/EditModal/EditModal';
import { SnackbarType } from '../../../../types/snackbar.type';

interface UserBlockProps {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  checkedUsers: string[];
  setCheckedUsers: (arg: string[]) => void;
}

const UserBlock: React.FC<UserBlockProps> = ({
  id,
  username,
  email,
  createdAt,
  checkedUsers,
  setCheckedUsers,
}) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [userAvatar, setUserAvatar] = React.useState<string>('');
  const [snackbar, setSnackbar] = React.useState<SnackbarType>({
    show: false,
    text: '',
    status: 'success',
  });
  const { deleteUser } = useDeleteUsers(id, setSnackbar);

  async function handleDeletePost() {
    await deleteUser();
  }

  React.useEffect(() => {
    getUserAvatar(id, setUserAvatar);
  }, []);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.checkbox}>
          <div className={s.checkboxContainer}>
            <input
              type="checkbox"
              checked={checkedUsers.includes(id)}
              onChange={() => {
                if (!checkedUsers.includes(id)) {
                  setCheckedUsers([...checkedUsers, id]);
                } else {
                  setCheckedUsers(
                    checkedUsers.filter((postID: string) => {
                      return postID !== id;
                    }),
                  );
                }
              }}
            />
          </div>
        </div>
        <div className={s.avatar}>
          <img src={userAvatar} alt="user-avatar" />
        </div>
        <div className={s.username}>
          <span>{username}</span>
        </div>
        <div className={s.email}>
          <span>{email}</span>
        </div>
        <div className={s.date}>
          <span>{format(Number(createdAt), 'yyyy.MM.dd')}</span>
        </div>
        <MenuPopup deletePost={handleDeletePost} setOpenModal={setOpenModal} />
        <EditModal
          id={id}
          username={username}
          email={email}
          createdAt={createdAt}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
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

export default UserBlock;
