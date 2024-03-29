import React from 'react';
import s from './PostCreatingPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../utils/postFunctions';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Button from '@mui/joy/Button';
import PublishIcon from '@mui/icons-material/Publish';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Alert, Slide, Snackbar } from '@mui/material';
import { CssVarsProvider, Option, Select } from '@mui/joy';
import useCategories from '../../hooks/useCategories';
import { CategoriesType } from '../../types/categories.type';
import HelmetTitle from '../../components/HelmetTitle/HelmetTitle';

export interface PostDataType {
  title: string;
  text: string;
  category: string;
}

const PostCreatingPage: React.FC = () => {
  const { getCategories } = useCategories();
  const quillRef = React.useRef<ReactQuill>(null);
  const [categories, setCategories] = React.useState<CategoriesType[] | null>(null);
  const [photo, setPhoto] = React.useState<null | File>(null);
  const [snackbar, showSnackbar] = React.useState<boolean>(false);
  const [snackbarText, setSnackbarText] = React.useState<string>('');
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
    }
  };

  function getText(text: string) {
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
  React.useEffect(() => {
    getCategories(setCategories);
  }, []);

  return (
    <>
      <div className={s.root} style={snackbar ? { pointerEvents: 'none', opacity: '0.3' } : {}}>
        <HelmetTitle title="Create Post" />
        <div className={s.container}>
          <h1>Create Post</h1>
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
            <Button
              startDecorator={photo ? <DoneOutlineIcon /> : <PublishIcon />}
              variant={photo ? 'soft' : 'outlined'}
              component="label">
              {photo ? 'Uploaded' : 'Upload Image'}
              <input
                type="file"
                onChange={(event) => handleImageUpload(event)}
                className={s.image}
                hidden
              />
            </Button>
            <Select
              placeholder="Choose category..."
              value={postData.category}
              onChange={(_, item) => setPostData({ ...postData, category: item! })}>
              {categories &&
                categories.map((category: CategoriesType) => {
                  return (
                    <Option key={category.id} value={category.title.toLowerCase()}>
                      {category.title}
                    </Option>
                  );
                })}
            </Select>
            <Button
              variant="solid"
              disabled={snackbar === true ? true : false}
              sx={{
                cursor: snackbar ? 'not-allowed' : 'pointer',
              }}
              onClick={() => {
                setSnackbarText('Post added to blog successfully.');
                showSnackbar(true);
                createPost(photo, postData, setPostData, navigate, showSnackbar, setSnackbarText);
              }}>
              Post
            </Button>
          </CssVarsProvider>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbar}
        onClose={() => showSnackbar(false)}
        message="Description should be maximum 2000 characters."
        TransitionComponent={Slide}
        autoHideDuration={3000}
        key={'bottom' + 'center'}>
        <Alert
          severity={
            snackbarText !== 'Description should be maximum 2000 characters.' &&
            snackbarText !== 'Please fill all the fields.'
              ? 'success'
              : 'error'
          }>
          {snackbarText}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostCreatingPage;
