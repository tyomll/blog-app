import React from 'react';
import s from './PostCreatingPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../utils/postFunctions';

export interface PostDataType {
  title: string;
  text: string;
  category: string;
  image: string;
}
const PostCreatingPage: React.FC = () => {
  const [photo, setPhoto] = React.useState<null | File>(null);
  const [postData, setPostData] = React.useState<PostDataType>({
    title: '',
    text: '',
    category: '',
    image: '',
  });
  // const push = useNavigate();
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.preventDefault();
      setPhoto(e.target.files[0]);
      alert('uploaded');
    }
  };
  return (
    <div>
      <input
        type="text"
        value={postData.title}
        placeholder="title"
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <input
        type="text"
        value={postData.text}
        placeholder="description"
        onChange={(e) => setPostData({ ...postData, text: e.target.value })}
      />
      <input type="file" onChange={(event) => handleImageUpload(event)} />
      <input
        type="text"
        value={postData.category}
        placeholder="category"
        onChange={(e) => setPostData({ ...postData, category: e.target.value })}
      />

      <button onClick={() => createPost(photo, postData, setPostData)}>Post</button>
    </div>
  );
};

export default PostCreatingPage;
