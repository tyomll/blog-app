import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

const useCategories = () => {

  const getCategories = async (setCategories: (arg: any) => void) => {
    const ref = collection(db, "categories")
    const data = await getDocs(ref)
    const categories = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown> }))
    setCategories(categories)
  }
  return { getCategories }
}
export default useCategories;