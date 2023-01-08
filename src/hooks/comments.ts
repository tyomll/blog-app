import { useCollectionData } from 'react-firebase-hooks/firestore';
import { query, where, collection, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export function useComments(postId: string) {
  const q = query(
    collection(db, "comments"),
    where("postId", "==", postId),
    orderBy("date", "asc")
  )
  const [comments, isLoading, error] = useCollectionData(q)
  if (error) throw error

  return { comments, isLoading }
}
