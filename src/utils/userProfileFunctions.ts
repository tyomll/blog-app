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