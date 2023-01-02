import { fetchPostById } from './../redux/blogByIdSlice/slice';
import { fetchPosts } from './../redux/postsSlice/slice';
import { fetchUserById } from '../redux/getUserByIdSlice/slice';
import { store } from '../redux/store';

export const getUserFromUserSlice = async (id: string | undefined, setLoading?: (arg: boolean) => void) => {
  if (setLoading) setLoading(true);
  if (id) {
    await store.dispatch(fetchUserById(id));
  }
  if (setLoading) setLoading(false);

}
export const getPostsFromPostSlice = async (setLoading?: (arg: boolean) => void) => {
  if (setLoading !== undefined) setLoading(true);
  await store.dispatch(fetchPosts());
  if (setLoading !== undefined) setLoading(false);
}

export const getPostById = async (id: string | undefined) => {
  if (id) {
    await store.dispatch(fetchPostById(id));
  }
};