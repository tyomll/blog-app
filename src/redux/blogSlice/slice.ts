import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type BlogCommentsType = {
  comments: {
    id: string;
    author: string;
    text: string;
  };
};

export type BlogType = {
  id: string;
  author: string;
  image: string;
  title: string;
  text: string;
  comments: BlogCommentsType[];
};

interface BlogSliceState {
  items: BlogType[];
  status: Status;
}

const initialState: BlogSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchBlogs = createAsyncThunk(
  "pizza/fetchBlogsStatus",
  async () => {
    const { data } = await axios.get(
      `https://63943e2a4df9248ead9ce21b.mockapi.io/Blogs`
    );

    return data;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<BlogType[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchBlogs.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = blogSlice.actions;

export default blogSlice.reducer;
