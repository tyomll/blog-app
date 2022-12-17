import { configureStore } from '@reduxjs/toolkit';
import blogs from './blogSlice/slice'
import post from './blogByIdSlice/slice'
export const store = configureStore({
  reducer: {
    blogs,
    post,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch