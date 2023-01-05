import uuid from 'react-uuid';
import { auth } from './../firebase';
import { PostDataType } from './../Pages/PostCreatingPage/PostCreatingPage';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';

export const createPost = async (file: File | null, postData: PostDataType) => {
  const storage = getStorage()
  const fileRef = ref(storage, 'postImages/' + uuid() + '.png')

  if (file) {
    await uploadBytes(fileRef, file).then(async () => {
      await getDownloadURL(fileRef).then(async (imageURL) => {
        const postCollectionRef = collection(db, 'posts');
        const title = postData.title;
        const text = postData.text;
        const category = postData.category;
        await addDoc(postCollectionRef, {
          author: {
            name: auth.currentUser?.displayName,
            id: auth.currentUser?.uid,
          },
          title,
          text,
          category,
          image: imageURL
        });
      }).catch((e) => {
        console.log(e.message)
      })
    }).catch((e) => {
      console.log(e.message)
    })
  }
};