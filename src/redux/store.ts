import { configureStore } from '@reduxjs/toolkit';
import blogs from './blogSlice/slice'

export const store = configureStore({
  reducer: {
    blogs,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch