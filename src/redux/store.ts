import { configureStore } from '@reduxjs/toolkit';
import posts from './postsSlice/slice'
import post from './blogByIdSlice/slice'
import getUserById from './getUserByIdSlice/slice'
import user from './userSlice/slice'

export const store = configureStore({
  reducer: {
    user,
    posts,
    post,
    getUserById,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch