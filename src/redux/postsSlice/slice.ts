import { getDocs, CollectionReference } from 'firebase/firestore';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostType } from '../../types/post.type';
import { PostsSliceStateType, Status } from './types/postSlice.type';

const initialState: PostsSliceStateType = {
  items: [],
  status: Status.LOADING,
  category: 'all',
};

export const fetchPosts = createAsyncThunk(
  "blog/fetchBlogsStatus",
  async (collectionRef: CollectionReference) => {
    const data = await getDocs(collectionRef)
    const newData = data.docs.map((doc) => {
      const { author, title, text, image, category, date } = doc.data() as PostType;
      return { id: doc.id, author, title, text, image, category, date };
    });
    return newData
  }
);
const postsSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PostType[]>) {
      state.items = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems, setCategory } = postsSlice.actions;

export default postsSlice.reducer;
