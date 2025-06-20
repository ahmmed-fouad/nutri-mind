import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.themealdb.com/api/json/v1/1/' }),
  endpoints: (builder) => ({
    getRecipes: builder.query<any, void>({
      query: () => 'search.php?f=c', // fetch recipes starting with 'c' (for demo)
    }),
    getRecipeById: builder.query<any, string>({
      query: (id) => `lookup.php?i=${id}`,
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeByIdQuery } = recipesApi; 