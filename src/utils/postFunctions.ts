import { auth } from './../firebase';
import { PostDataType } from './../Pages/PostCreatingPage/PostCreatingPage';
import { collection, addDoc, updateDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import { uuidv4 } from '@firebase/util';

export const createPost = async (file: File | null, postData: PostDataType, setPostData: (arg: PostDataType) => void) => {
  console.log(postData)
  const storage = getStorage()
  const fileRef = ref(storage, 'postImages/' + uuidv4() + '.png')
  if (file) {
    await uploadBytes(fileRef, file).then(async () => {
      await getDownloadURL(fileRef).then(async (imageURL) => {
        const postCollectionRef = collection(db, 'posts');
        const title = postData.title;
        const text = postData.text;
        const category = postData.category;
        await addDoc(postCollectionRef, {
          id: uuidv4(),
          author: {
            name: auth.currentUser?.displayName,
            id: auth.currentUser?.uid,
          },
          title,
          text,
          category,
          image: imageURL,
          date: Date.now()
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
    console.log('post add areci')
  }).catch((e) => {
    console.log(e.message)
  })
}

export const addComment = async (text: string, postId: string, uid: string, showSnackbar: (arg: boolean) => void, setSnackbarText: (arg: string) => void) => {
  const id = uuidv4()
  const date = Date.now()
  const docRef = doc(db, 'comments', id)
  await setDoc(docRef, { text, id, postId, date, uid })
    .then(() => {
      setSnackbarText('Your comment added successfully!');
      showSnackbar(true)
    })
    .catch((e) => {
      showSnackbar(true)
      setSnackbarText("Something went wrong. Please try again.")
    })
}

export async function deleteComment(id: string, showSnackbar: (arg: boolean) => void, setSnackbarText: (arg: string) => void) {
  const docRef = doc(db, 'comments', id)
  await deleteDoc(docRef).then(() => {
    showSnackbar(true)
    setSnackbarText('Comment deleted successfully!')
  }).catch((e) => {
    showSnackbar(true)
    setSnackbarText(e.message)
  })
}