import { store } from './../redux/store';
import { getPostsFromPostSlice } from './fetchFromRedux';
import { fetchUserById } from './../redux/getUserByIdSlice/slice';
import { storage, auth } from './../firebase';
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
  });
}
export function fetchUserDataById(
  id: string,
  setImageURL: (arg: string) => void,
  setLoading: (arg: boolean) => void,
  push: (arg: string) => void,
) {
  if (id === auth.currentUser?.uid) {
    push('/profile');
    return
  }
  store.dispatch(fetchUserById(id))
  getUserAvatar(id, setImageURL);
  getPostsFromPostSlice(setLoading);

}