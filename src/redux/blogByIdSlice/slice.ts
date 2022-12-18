import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type BlogCommentsType = {
    id: string;
    author: string;
    text: string;
};

export type BlogByIdSliceType = {
  id: string;
  title: string;
  author: string;
  image: string;
  text: string;
  category: string;
  comments: BlogCommentsType[];
};

interface BlogByIdSliceState {
  item: BlogByIdSliceType;
  status: Status;
}

const initialState: BlogByIdSliceState = {
  item: <BlogByIdSliceType>{},
  status: Status.LOADING,
};

export const fetchPostById = createAsyncThunk(
  "pizza/fetchBlogByIdStatus",
  async (id: string) => {
    const { data } = await axios.get(
      `https://639b67c631877e43d68bac36.mockapi.io/blogs/${id}`
    );

    return data;
  }
);

const blogByIdSlice = createSlice({
  name: "postById",
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<BlogByIdSliceType>) {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.item = action.payload;
      state.status = Status.SUCCESS;
    });
  },
});

export const { setItem } = blogByIdSlice.actions;

export default blogByIdSlice.reducer;
