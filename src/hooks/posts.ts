import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from "firebase/firestore"
import { db } from "../firebase"
import swal from 'sweetalert';
import { SnackbarType } from "../types/snackbar.type";
import { PostType } from '../types/post.type';

export const usePosts = () => {
  const getPosts = async (setPosts: (arg: PostType[]) => void) => {
    const ref = collection(db, "posts")
    const data = await getDocs(ref)
    const posts = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown> })) as any
    setPosts(posts)
  }
  return { getPosts }
}

export const useTodaysPosts = () => {
  const getTodaysPosts = async (setTodaysPosts: (arg: PostType[]) => void) => {
    const ref = collection(db, "posts")
    const data = await getDocs(ref)
    const posts: any = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown> }))
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const todaysPosts = posts.filter((post: any) => Number(Date.now() - post.date) < oneDayInMs)
    setTodaysPosts(todaysPosts)
  }
  return { getTodaysPosts }
}

export function useDeletePosts(id?: string, setSnackbar?: (arg: SnackbarType) => void) {
  const refresh = () => window.location.reload();

  async function deletePost() {
    let docId = null as any;
    const q = query(collection(db, "posts"), where("id", "==", id))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (doc) => docId = doc.id)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true as any,
      dangerMode: true as any,
    }).then(async (willDelete: boolean) => {
      if (willDelete && docId) {
        await deleteDoc(doc(db, 'posts', docId))
        const q = query(collection(db, "comments"), where("postId", "==", docId))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async (doc) => deleteDoc(doc.ref))
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

  async function deleteMultiplePost(deletingPostsArray: string[]) {
    const batch = writeBatch(db);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true as any,
      dangerMode: true as any,
    }).then(async (willDelete: boolean) => {
      if (willDelete) {
        const deletePromise = deletingPostsArray.map(async (postID: string) => {
          let docId = null as any;
          const q = query(collection(db, "posts"), where("id", "==", postID))
          const querySnapshot = await getDocs(q)
          querySnapshot.forEach((doc) => docId = doc.id)
          return docId;
        });
        const docIds = await Promise.all(deletePromise);
        docIds.forEach((id) => {
          batch.delete(doc(db, "posts", id))
        });
        await batch.commit();
        if (setSnackbar) {
          setSnackbar({
            show: true,
            text: "Posts deleted successfully!",
            status: 'success',
          })
        }
      }
      refresh()
    });
  }



  return { deletePost, deleteMultiplePost }
}