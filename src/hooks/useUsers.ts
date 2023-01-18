import { getDocs, collection, query, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import swal from 'sweetalert';
import { db } from '../firebase';
import { SnackbarType } from '../types/snackbar.type';
import { UserType } from '../types/user.type';

const useUsers = () => {
  const getUsers = async (setUser: (arg: UserType[]) => void) => {
    const ref = collection(db, "users")
    const data = await getDocs(ref)
    const users = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown>, id: doc.id })) as UserType[]
    setUser(users)
  }
  return { getUsers }
}
export default useUsers;

export const useTodaysUsers = () => {
  const getTodaysUsers = async (setTodaysUsers: (arg: UserType[]) => void) => {
    const ref = collection(db, "users")
    const data = await getDocs(ref)
    const users: any = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown> }))
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const todaysUsers = users.filter((user: any) => Number(Date.now() - user.createdAt) < oneDayInMs) as UserType[]
    setTodaysUsers(todaysUsers)
  }
  return { getTodaysUsers }

}

export function useDeleteUsers(id?: string, setSnackbar?: (arg: SnackbarType) => void) {
  const refresh = () => window.location.reload();

  async function deleteUser() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true as boolean,
      dangerMode: true as boolean,
    }).then(async (willDelete: boolean) => {
      if (willDelete && id) {
        await deleteDoc(doc(db, 'users', id))
        if (setSnackbar) {
          setSnackbar({
            show: true,
            text: "Post deleted successfully!",
            status: 'success',
          })
        }
        refresh()
      }
    });
  }

  async function deleteMultipleUsers(deletingUsersArray: string[]) {
    const batch = writeBatch(db);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover these users!",
      icon: "warning",
      buttons: true as boolean,
      dangerMode: true as boolean,
    }).then(async (willDelete: boolean) => {
      if (willDelete) {
        const deletePromise = deletingUsersArray.map(async (userID: string) => {
          let docId = '' as string;
          const q = query(collection(db, "users"))
          const querySnapshot = await getDocs(q)
          querySnapshot.forEach(() => docId = userID)
          return docId;
        });
        const docIds = await Promise.all(deletePromise);
        docIds.forEach((id) => {
          batch.delete(doc(db, "users", id))
        });
        await batch.commit();
        if (setSnackbar) {
          setSnackbar({
            show: true,
            text: "Users deleted successfully!",
            status: 'success',
          })
        }
      }
      refresh()
    });
  }



  return { deleteUser, deleteMultipleUsers }
}