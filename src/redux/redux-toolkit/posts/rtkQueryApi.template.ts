/**
 * ============================================================================
 * 🎓 ALTERNATIVE ADVANCED RTK: RTK Query (createApi)
 * ============================================================================
 * Redux Toolkit also includes RTK Query for automated caching, loading states,
 * and background re-fetching.
 * 
 * Here is how this entire CRUD is done with RTK Query:
 * ============================================================================
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Post, PostsApiResponse, PostFormData } from '../../../../types/post';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    // Query: Get all posts
    getPosts: builder.query<PostsApiResponse, { limit?: number; skip?: number }>({
      query: ({ limit = 10, skip = 0 }) => `posts?limit=${limit}&skip=${skip}`,
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    // Query: Get post by ID
    getPostById: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),

    // Mutation: Add Post
    addPost: builder.mutation<Post, PostFormData>({
      query: (body) => ({
        url: 'posts/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    // Mutation: Update Post
    updatePost: builder.mutation<Post, { id: number; data: Partial<PostFormData> }>({
      query: ({ id, data }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Post', id }],
    }),

    // Mutation: Delete Post
    deletePost: builder.mutation<{ id: number; isDeleted: boolean }, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
