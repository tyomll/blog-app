import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
  authorId: string;
  author: string;
  image: string;
  title: string;
  text: string;
  category: string;
  comments: PostCommentsType[];
};

interface PostsSliceStateType {
  items: PostType[];
  status: Status;
  category: string;
}

const initialState: PostsSliceStateType = {
  items: [],
  status: Status.LOADING,
  category: 'all',
};

export const fetchPosts = createAsyncThunk(
  "pizza/fetchBlogsStatus",
  async () => {
    const { data } = await axios.get(
      `https://639b67c631877e43d68bac36.mockapi.io/blogs`
    );

    return data;
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
