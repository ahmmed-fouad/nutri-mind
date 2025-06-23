import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.to/api/' }),
  endpoints: (builder) => ({
    getBlogPosts: builder.query<any, void>({
      query: () => 'articles?tag=nutrition&per_page=12',
    }),
  }),
});

export const { useGetBlogPostsQuery } = blogApi; 