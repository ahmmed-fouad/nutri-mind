import { configureStore } from '@reduxjs/toolkit';
import userFormReducer from './userFormApi';
import { recipesApi } from '@/services/recipesApi';
import { blogApi } from '@/services/blogApi';

export const store = configureStore({
  reducer: {
    userForm: userFormReducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipesApi.middleware, blogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 