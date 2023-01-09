import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { getPostsFromPostSlice } from './fetchFromRedux';
import { storage, db } from './../firebase';
import { updateProfile, User } from 'firebase/auth';
import { getStorage, ref, getDownloadURL, uploadString } from 'firebase/storage';


export async function uploadUserAvatar(photo: string | null, currentUser: User | null, setLoading: (arg: boolean) => void) {
  const storage = getStorage()
  if (currentUser) {
    const fileRef = ref(storage, 'userAvatars/' + currentUser.uid + '.png')
    setLoading(true)
    if (photo) {
      await uploadString(fileRef, photo, 'data_url')
    }
    const photoURL = await getDownloadURL(fileRef)
    updateProfile(currentUser, {
      photoURL: photoURL as string
    }
    )
    setLoading(false)
  }
}

export function getUserAvatar(id: string, setImageURL: (arg: string) => void) {
  const fileRef = ref(storage, 'userAvatars/' + id + '.png');
  getDownloadURL(fileRef).then((url) => {
    setImageURL(url);
  })
}

export async function fetchUserDataById(
  id: string,
  setAuthor?: (arg: DocumentData | undefined) => void,
  setImageURL?: (arg: string) => void,
  setLoading?: (arg: boolean) => void,

) {

  if (setAuthor) {
    const docRef = doc(db, 'users', id)
    const data = await getDoc(docRef)
    const userInfo = data.data()
    setAuthor(userInfo)
  }

  if (setImageURL) getUserAvatar(id, setImageURL);
  getPostsFromPostSlice(setLoading);

}