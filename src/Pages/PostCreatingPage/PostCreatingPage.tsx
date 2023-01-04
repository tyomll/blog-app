import React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import s from './PostCreatingPage.module.scss';
import { db, auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

interface PostDataType {
  title: string;
  text: string;
  image: string;
  category: string;
}
const PostCreatingPage: React.FC = () => {
  const [postData, setPostData] = React.useState<PostDataType>({
    title: '',
    text: '',
    image:
      'https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-127465079.jpg',
    category: '',
  });
  const push = useNavigate();
  const postCollectionRef = collection(db, 'posts');
  const createPost = async () => {
    const title = postData.title;
    const text = postData.text;
    const image = postData.image;
    const category = postData.category;

    await addDoc(postCollectionRef, {
      author: {
        name: auth.currentUser?.displayName,
        id: auth.currentUser?.uid,
      },
      title,
      text,
      category,
      image,
    });
  };
  return (
    <div>
      <input
        type="text"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <input
        type="text"
        value={postData.text}
        onChange={(e) => setPostData({ ...postData, text: e.target.value })}
      />
      <input
        type="text"
        value={postData.category}
        onChange={(e) => setPostData({ ...postData, category: e.target.value })}
      />

      <button onClick={createPost}>Post</button>
    </div>
  );
};

export default PostCreatingPage;
