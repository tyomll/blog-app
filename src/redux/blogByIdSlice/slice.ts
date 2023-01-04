import { doc, getDoc } from 'firebase/firestore';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from '../../firebase';

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
  authorId?: string;
  title: string;
  author: string;
  image: string;
  text: string;
  category: string;
  comments: BlogCommentsType[];
};

interface BlogByIdSliceState {
  item: any;
  status: Status;
}

const initialState: BlogByIdSliceState = {
  item: {} as BlogByIdSliceType,
  status: Status.LOADING,
};

export const fetchPostById = createAsyncThunk(
  "blog/fetchBlogByIdStatus",
  async (id: string) => {
    const docRef = doc(db, 'posts', id)
    const data = await getDoc(docRef)
    return data.data()
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
