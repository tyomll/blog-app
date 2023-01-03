import { updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export async function uploadUserAvatar(file: File | null, currentUser: any, setLoading: any) {
  const storage = getStorage()
  const fileRef = ref(storage, 'userAvatars/' + currentUser.uid + '.png')
  setLoading(true)
  if (file) {
    const snapshot = await uploadBytes(fileRef, file)
  }
  const photoURL = await getDownloadURL(fileRef)
  updateProfile(currentUser, {
    photoURL: <any>photoURL
  }
  )
  setLoading(false)
  alert('exav')

}