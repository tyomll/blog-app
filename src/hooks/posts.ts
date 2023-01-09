import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"
import swal from 'sweetalert';

export function useDeletePosts(id: string, showSnackbar: (arg: boolean) => void, setSnackbarText: (arg: string) => void, refresh: () => void) {
  async function deletePost() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
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