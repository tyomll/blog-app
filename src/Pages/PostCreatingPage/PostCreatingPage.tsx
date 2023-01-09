import React from 'react';
import s from './PostCreatingPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../utils/postFunctions';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Button from '@mui/joy/Button';
import PublishIcon from '@mui/icons-material/Publish';
import swal from 'sweetalert';

export interface PostDataType {
  title: string;
  text: string;
  category: string;
}

const PostCreatingPage: React.FC = () => {
  const quillRef = React.useRef<ReactQuill>(null);
  const [photo, setPhoto] = React.useState<null | File>(null);

  const [postData, setPostData] = React.useState<PostDataType>({
    title: '',
    text: '',
    category: '',
  });

  // const push = useNavigate();
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.preventDefault();
      setPhoto(e.target.files[0]);
      alert('uploaded');
    }
  };
  function getText(e: any) {
    setPostData({ ...postData, text: e });
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
        <ReactQuill ref={quillRef} onChange={(e) => getText(e)} placeholder="Description..." />

        <Button startDecorator={<PublishIcon />} variant="solid" component="label">
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
        {/* <button className={s.submit}>Post</button> */}
        <Button variant="solid" onClick={() => createPost(photo, postData, setPostData)}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default PostCreatingPage;
