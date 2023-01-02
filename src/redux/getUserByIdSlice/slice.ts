import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type UserByIdSliceType = {
  id?: string;
  authorId?: string;
  avatar?: string;
  userName?: string;
  password?: string;
};

type initialStateType = {
  item: UserByIdSliceType
}
const initialState: initialStateType = {
  item: {},
};

export const fetchUserById = createAsyncThunk(
  "postById/fetchUserByIdStatus",
  async (id: string) => {
    const { data } = await axios.get(
      `https://639b67c631877e43d68bac36.mockapi.io/Users/${id}`
    );
    return data;
  }
);

const userByIdSlice = createSlice({
  name: "postById",
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<UserByIdSliceType>) {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.item = action.payload;
    });
  },
});

export const { setItem } = userByIdSlice.actions;

export default userByIdSlice.reducer;
