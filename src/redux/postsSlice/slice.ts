import { getDocs } from 'firebase/firestore';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type PostCommentsType = {
  comments: {
    id: string;
    author: string;
    text: string;
  };
};

export type PostType = {
  id: string;
  author: {
    name: string;
    id: string
  };
  title: string;
  text: string;
  image: string;
  category: string;
};

interface PostsSliceStateType {
  items: any;
  status: Status;
  category: string;
}

const initialState: PostsSliceStateType = {
  items: [],
  status: Status.LOADING,
  category: 'all',
};

export const fetchPosts = createAsyncThunk(
  "blog/fetchBlogsStatus",
  async (collectionRef: any) => {
    const data = await getDocs(collectionRef)
    const newData = data.docs.map((doc) => ({ ...doc.data() as Record<string, unknown>, id: doc.id }));
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
