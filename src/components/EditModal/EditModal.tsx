import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { format } from 'date-fns';
import { updatePost } from '../../utils/postFunctions';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import useCategories from '../../hooks/useCategories';
import { AlertPropsColorOverrides, CssVarsProvider, Option, Select } from '@mui/joy';
import { updateUser } from '../../utils/userProfileFunctions';
import { EditModalProps, PostEditedDataType, UserEditedDataType } from './types/editModal.type';
import { CategoriesType } from '../../types/categories.type';

const EditModal: React.FC<EditModalProps> = ({
  id,
  username,
  email,
  createdAt,
  title,
  category,
  date,
  openModal,
  setOpenModal,
}) => {
  const { getCategories } = useCategories();
  const [categories, setCategories] = React.useState<CategoriesType[] | null>(null);
  const [postEditedData, setPostEditedData] = React.useState<PostEditedDataType>({
    title: title,
    category: category,
    date: date as Date | number | string,
  });
  const [userEditedData, setUserEditedData] = React.useState<UserEditedDataType>({
    username: username,
    email: email,
    createdAt: Number(createdAt) as number,
  });
  const [snackbar, setSnackbar] = React.useState({
    show: false,
    text: '',
    status: 'success' as any,
  });

  function handleCloseModal() {
    setOpenModal(false);
  }

  async function handleSavePostData() {
    if (Object.values(postEditedData).every((value) => value !== '')) {
      await updatePost(id, postEditedData, setSnackbar);
    } else {
      setSnackbar({
        show: true,
        text: 'Fill all fields!',
        status: 'error',
      });
    }
  }
  async function handleSaveUserData() {
    if (Object.values(postEditedData).every((value) => value !== '')) {
      await updateUser(id, userEditedData, setSnackbar);
    } else {
      setSnackbar({
        show: true,
        text: 'Fill all fields!',
        status: 'error',
      });
    }
  }
  React.useEffect(() => {
    getCategories(setCategories);
  }, []);

  const userEditMode = (
    <div>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            After editing user details u can never return old details automatically.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            placeholder="Username"
            type="username"
            fullWidth
            variant="standard"
            value={userEditedData.username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserEditedData({ ...userEditedData, username: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            placeholder="Email"
            label="User Email"
            type="email"
            fullWidth
            variant="standard"
            value={userEditedData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserEditedData({ ...userEditedData, email: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="date"
            placeholder="Created At"
            label="Created At"
            type="date"
            fullWidth
            variant="standard"
            required={false}
            value={
              userEditedData.createdAt && format(Number(userEditedData.createdAt), 'yyyy-MM-dd')
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setUserEditedData({
                ...userEditedData,
                createdAt: new Date(e.target.value).getTime(),
              });
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              e.preventDefault();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveUserData}>Save</Button>
        </DialogActions>
      </Dialog>
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

  const postEditMode = (
    <div>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit Post Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            After editing post details u can never return old details automatically.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Post Title"
            placeholder="Title"
            type="title"
            fullWidth
            variant="standard"
            value={postEditedData.title}
            onChange={(e) => setPostEditedData({ ...postEditedData, title: e.target.value })}
          />
          <CssVarsProvider>
            <label htmlFor="select-category" id="select-label" style={{ fontSize: '13px' }}>
              Category
            </label>
            <Select
              id="select-category"
              placeholder="Choose category..."
              value={postEditedData.category}
              onChange={(_: any, item: any) =>
                setPostEditedData({ ...postEditedData, category: item })
              }
              sx={{
                marginTop: '5px',
              }}>
              {categories &&
                categories.map((category: CategoriesType) => {
                  return (
                    <Option key={category.id} value={category.title.toLowerCase()}>
                      {category.title}
                    </Option>
                  );
                })}
            </Select>
          </CssVarsProvider>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            placeholder="Date"
            label="Post Date"
            type="date"
            fullWidth
            variant="standard"
            required={false}
            value={postEditedData.date && format(Number(postEditedData.date), 'yyyy-MM-dd')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setPostEditedData({ ...postEditedData, date: new Date(e.target.value).getTime() });
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              e.preventDefault();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSavePostData}>Save</Button>
        </DialogActions>
      </Dialog>
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

  return title ? postEditMode : userEditMode;
};

export default EditModal;
