import uuid from 'react-uuid';
import { auth } from './../firebase';
import { PostDataType } from './../Pages/PostCreatingPage/PostCreatingPage';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';

export const createPost = async (file: File | null, postData: PostDataType, setPostData: (arg: PostDataType) => void) => {
  const storage = getStorage()
  const fileRef = ref(storage, 'postImages/' + uuid() + '.png')

  if (file) {
    await uploadBytes(fileRef, file).then(async () => {
      await getDownloadURL(fileRef).then(async (imageURL) => {
        setPostData({ ...postData, image: imageURL })
        const postCollectionRef = collection(db, 'posts');
        const title = postData.title;
        const text = postData.text;
        const category = postData.category;
        const comments = postData.comments;
        const image = postData.image
        await addDoc(postCollectionRef, {
          author: {
            name: auth.currentUser?.displayName,
            id: auth.currentUser?.uid,
          },
          title,
          text,
          category,
          comments,
          image,

        });
      }).catch((e) => {
        console.log(e.message)
      })
    }).catch((e) => {
      console.log(e.message)
    })
  }
};

export const updatePost = (id: string, data: any) => {
  const newData = {
    comments: [
      data
    ]
  }
  const postRef = doc(db, "posts", id);
  updateDoc(postRef, newData).then(() => {
    console.log('add areci')
  }).catch((e) => {
    console.log(e.message)
  })
}