import { configureStore } from '@reduxjs/toolkit';
import posts from './postsSlice/slice'
import post from './blogByIdSlice/slice'
import user from './userByIdSlice/slice'

export const store = configureStore({
  reducer: {
    posts,
    post,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch