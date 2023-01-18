import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { CategoriesType } from '../types/categories.type';

const useCategories = () => {
  const getCategories = async (setCategories: (arg: CategoriesType[]) => void) => {
    const ref = collection(db, "categories")
    const data = await getDocs(ref)
    const categories = data.docs.map((doc) => ({ ...doc.data() as Record<string, any> })) as CategoriesType[]
    setCategories(categories)
  }
  return { getCategories }
}
export default useCategories;