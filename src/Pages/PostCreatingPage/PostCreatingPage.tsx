import React from 'react';
import s from './PostCreatingPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../utils/postFunctions';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Button from '@mui/joy/Button';
import PublishIcon from '@mui/icons-material/Publish';
import swal from 'sweetalert';
import parse from 'html-react-parser';
import { Alert, Slide, Snackbar } from '@mui/material';
import { CssVarsProvider } from '@mui/joy';

export interface PostDataType {
  title: string;
  text: string;
  category: string;
}

const PostCreatingPage: React.FC = () => {
  const quillRef = React.useRef<ReactQuill>(null);
  const [photo, setPhoto] = React.useState<null | File>(null);
  const [snackbar, showSnackbar] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');
  const [postData, setPostData] = React.useState<PostDataType>({
    title: '',
    text: '',
    category: '',
  });

  const navigate = useNavigate();
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.preventDefault();
      setPhoto(e.target.files[0]);
      showSnackbar(true);
      setSnackbarText('Image uploaded!');
    }
  };
  function getText(text: any) {
    const textLength = quillRef!.current!.editor!.getLength();
    if (textLength <= 2000) {
      setPostData({ ...postData, text });
    } else {
      setSnackbarText('Description should be maximum 2000 characters.');
      showSnackbar(true);
      const trimmedValue = text.substring(0, 2000);
      setPostData({ ...postData, text: trimmedValue });
    }
  }
  return (
    <div className={s.root}>
      <div className={s.container}>
        <input
          type="text"
          value={postData.title}
          placeholder="Title"
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          className={s.title}
        />
        <ReactQuill
          ref={quillRef}
          value={postData.text}
          onChange={(e) => getText(e)}
          placeholder="Description..."
        />
        <CssVarsProvider>
          <Button startDecorator={<PublishIcon />} variant="outlined" component="label">
            Upload Image
            <input
              type="file"
              onChange={(event) => handleImageUpload(event)}
              className={s.image}
              hidden
            />
          </Button>
          <input
            type="text"
            value={postData.category}
            placeholder="Category"
            onChange={(e) => setPostData({ ...postData, category: e.target.value })}
            className={s.title}
          />
          <Button
            variant="solid"
            onClick={() => {
              setSnackbarText('Post added to blog successfully.');
              showSnackbar(true);
              createPost(photo, postData, setPostData, navigate);
            }}>
            Post
          </Button>
        </CssVarsProvider>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbar}
        onClose={() => showSnackbar(false)}
        message="rfasfas"
        TransitionComponent={Slide}
        autoHideDuration={3000}
        key={'bottom' + 'center'}>
        <Alert
          severity={
            snackbarText !== 'Description should be maximum 2000 characters.' ? 'success' : 'error'
          }>
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PostCreatingPage;
