import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"
import swal from 'sweetalert';



export const usePosts = () => {
  const getPosts = async (setPosts: (arg: any) => void) => {
    const ref = collection(db, "posts")
    const data = await getDocs(ref)
    const posts = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown> }))
    setPosts(posts)
  }
  return { getPosts }
}

export const useTodaysPosts = () => {
  const getTodaysPosts = async (setTodaysPosts: (arg: any) => void) => {
    const ref = collection(db, "posts")
    const data = await getDocs(ref)
    const posts: any = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown> }))
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const todaysPosts = posts.filter((post: any) => Number(Date.now() - post.date) < oneDayInMs)
    setTodaysPosts(todaysPosts)
  }
  return { getTodaysPosts }
}

export function useDeletePosts(id: string, showSnackbar: (arg: boolean) => void, setSnackbarText: (arg: string) => void, refresh: () => void) {
  async function deletePost() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true as any,
      dangerMode: true as any,
    }).then(async (willDelete: boolean) => {
      if (willDelete && id) {
        await deleteDoc(doc(db, 'posts', id))
        const q = query(collection(db, "comments"), where("postId", "==", id))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async (doc) => deleteDoc(doc.ref))
        showSnackbar(true)
        setSnackbarText("Post deleted successfully!")
        refresh()
      }
    });
  }
  return { deletePost }
}