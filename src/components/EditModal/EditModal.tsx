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

interface EditModalProps {
  id: string;
  title: string;
  category: string;
  date: any;
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}
export interface editedDataType {
  title: string;
  category: string;
  date: any;
}
const EditModal: React.FC<EditModalProps> = ({
  id,
  title,
  category,
  date,
  openModal,
  setOpenModal,
}) => {
  const [editedData, setEditedData] = React.useState<editedDataType>({
    title: title,
    category: category,
    date: date as any,
  });
  const [snackbar, setSnackbar] = React.useState({
    show: false,
    text: '',
    status: 'success' as any,
  });
  function handleCloseModal() {
    setOpenModal(false);
  }

  async function handleSaveData() {
    if (Object.values(editedData).every((value) => value !== '')) {
      console.log('exav');
      await updatePost(id, editedData, setSnackbar);
    } else {
      console.log('chexav');
      setSnackbar({
        show: true,
        text: 'Fill all fields!',
        status: 'error',
      });
    }
  }
  return (
    <div>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit Post</DialogTitle>
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
            value={editedData.title}
            onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            placeholder="Category"
            label="Post Category"
            type="category"
            fullWidth
            variant="standard"
            value={editedData.category}
            onChange={(e) => setEditedData({ ...editedData, category: e.target.value })}
          />
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
            value={format(editedData.date, 'yyyy-MM-dd')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setEditedData({ ...editedData, date: new Date(e.target.value).getTime() });
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              e.preventDefault();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveData}>Save</Button>
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
};

export default EditModal;
