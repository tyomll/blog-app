import React from 'react';
import { format } from 'date-fns';
import s from './PostBlock.module.scss';
import MenuPopup from '../../../../components/MenuPopup/MenuPopup';
import EditModal from '../../../../components/EditModal/EditModal';
import { Alert, Slide, Snackbar } from '@mui/material';
import { useDeletePosts } from '../../../../hooks/posts';
import { SnackbarType } from '../../../../types/snackbar.type';

export interface PostBlockProps {
  id: string;
  title: string;
  image: string;
  author: {
    id: string;
    name: string;
  };
  category: string;
  date: string | number | Date;
  checkedPosts: any;
  setCheckedPosts: (arg: any) => void;
}

const PostBlock: React.FC<PostBlockProps> = ({
  id,
  title,
  image,
  author,
  category,
  date,
  checkedPosts,
  setCheckedPosts,
}) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [snackbar, setSnackbar] = React.useState<SnackbarType>({
    show: false,
    text: '',
    status: 'success',
  });
  const { deletePost } = useDeletePosts(id, setSnackbar);

  async function handleDeletePost() {
    await deletePost();
  }
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.checkbox}>
          <div className={s.checkboxContainer}>
            <input
              type="checkbox"
              checked={checkedPosts.includes(id)}
              onChange={() => {
                if (!checkedPosts.includes(id)) {
                  setCheckedPosts([...checkedPosts, id]);
                } else {
                  setCheckedPosts(
                    checkedPosts.filter((postID: string) => {
                      return postID !== id;
                    }),
                  );
                }
              }}
            />
          </div>
        </div>
        <div className={s.image}>
          <img src={image} alt="post-image" />
        </div>
        <div className={s.title}>
          <span>{title}</span>
        </div>
        <div className={s.author}>
          <span>{author.name}</span>
        </div>
        <div className={s.category}>
          <span>{category}</span>
        </div>
        <div className={s.date}>
          <span>{format(Number(date), 'yyyy.MM.dd')}</span>
        </div>
        <MenuPopup deletePost={handleDeletePost} setOpenModal={setOpenModal} />
        <EditModal
          id={id}
          title={title}
          category={category}
          date={date}
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

export default PostBlock;
