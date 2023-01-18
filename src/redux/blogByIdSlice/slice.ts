import { doc, getDoc } from 'firebase/firestore';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from '../../firebase';
import { BlogByIdSliceState, BlogByIdSliceType, Status } from './types/blogByIdSlice.type';

const initialState: BlogByIdSliceState = {
  item: {} as BlogByIdSliceType,
  status: Status.LOADING,
};

export const fetchPostById = createAsyncThunk(
  "blog/fetchBlogByIdStatus",
  async (id: string) => {
    const docRef = doc(db, 'posts', id)
    const data = await getDoc(docRef)
    return data.data() as BlogByIdSliceType
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
