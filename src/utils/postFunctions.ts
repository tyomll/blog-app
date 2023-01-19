import { SnackbarType } from './../types/snackbar.type';
import { auth } from './../firebase';
import { PostDataType } from './../Pages/PostCreatingPage/PostCreatingPage';
import { collection, addDoc, doc, setDoc, deleteDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import { uuidv4 } from '@firebase/util';
import { PostEditedDataType } from '../components/EditModal/types/editModal.type';

export const createPost = async (file: File | null, postData: PostDataType, navigate: (arg: string) => void, showSnackbar: (arg: boolean) => void, setSnackbarText: (arg: string) => void) => {
  const storage = getStorage()
  const fileRef = ref(storage, 'postImages/' + uuidv4() + '.png')
  if (file && postData.title.trim() !== '' && postData.text.trim() !== '' && postData.category.trim() !== '') {
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
      navigate('/')
    }).catch((e) => {
      console.log(e.message)
    })
  }
  else {
    setSnackbarText("Please fill all the fields.")
    showSnackbar(true)
  }
};
export const addComment = async (text: string, postId: string, uid: string | undefined, snackbar: SnackbarType, setSnackbar: (arg: SnackbarType) => void,) => {
  const id = uuidv4()
  const date = Date.now()
  const docRef = doc(db, 'comments', id)
  await setDoc(docRef, { text, id, postId, date, uid })
    .then(() => {
      setSnackbar({ ...snackbar, show: true, text: 'Your comment added successfully!', status: 'success' })
    })
    .catch((e) => {
      setSnackbar({ ...snackbar, show: true, text: 'Something went wrong. Please try again.', status: 'error' })
    })
}

export async function updatePost(id: string, data: PostEditedDataType, setSnackbar: (arg: SnackbarType) => void) {
  const refresh = () => window.location.reload();
  let docId = null as any;
  const q = query(collection(db, "posts"), where("id", "==", id))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(async (doc) => docId = doc.id)
  const postRef = doc(db, 'posts', docId)

  updateDoc(postRef, {
    title: data.title,
    category: data.category,
    date: data.date
  }).then(response => {
    setSnackbar({
      show: true,
      text: 'Post was updated!',
      status: 'success',
    })
    refresh()
  }).catch(error => {
    setSnackbar({
      show: true,
      text: error.message,
      status: 'error',
    })
  })
}
export async function deleteComment(id: string, snackbar: SnackbarType, setSnackbar: (arg: SnackbarType) => void) {
  const docRef = doc(db, 'comments', id)
  await deleteDoc(docRef).then(() => {
    setSnackbar({ ...snackbar, show: true, text: 'Comment deleted successfully!', status: 'success' })
  }).catch((e) => {
    setSnackbar({ ...snackbar, show: true, text: e.message, status: 'error' })
  })
}