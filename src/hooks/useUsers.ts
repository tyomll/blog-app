import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

const useUsers = () => {
  const getUsers = async (setUser: (arg: any) => void) => {
    const ref = collection(db, "users")
    const data = await getDocs(ref)
    const users = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown>, id: doc.id }))
    setUser(users)
  }
  return { getUsers }
}
export default useUsers;

export const useTodaysUsers = () => {
  const getTodaysUsers = async (setTodaysUsers: (arg: any) => void) => {
    const ref = collection(db, "users")
    const data = await getDocs(ref)
    const users: any = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown> }))
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const todaysUsers = users.filter((user: any) => Number(Date.now() - user.createdAt) < oneDayInMs)
    setTodaysUsers(todaysUsers)
  }
  return { getTodaysUsers }
}