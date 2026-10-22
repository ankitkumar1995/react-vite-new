import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post, PostsApiResponse, PostFormData } from "../../../../types/post";

const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    tagTypes: ["Post"],
    endpoints: (builder) => ({
        getPosts: builder.query<PostsApiResponse, { limit?: number; skip?: number }>({
            query: ({ limit = 10, skip = 0 }) => `posts?limit=${limit}&skip=${skip}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.posts.map(({ id }) => ({ type: "Post" as const, id })),
                        { type: "Post", id: "LIST" }
                    ]
                    : [{ type: "Post", id: "LIST" }]
        }),
        getPostById: builder.query<Post, number>({
            query: (id) => `posts/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Post", id }]
        }),
        addPost: builder.mutation<Post, PostFormData>({
            query: (body) => ({
                method: "POST",
                url: "/posts/add",
                body
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }]
        }),
        updatePost: builder.mutation<Post, { id: number, data: Partial<PostFormData> }>({
            query: ({ id, data }) => ({
                method: "PUT",
                url: `/posts/${id}`,
                body: data
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }]
        }),
        deletePost: builder.mutation<{ id: number, isDeleted: boolean }, number>({
            query: (id) => ({
                method: "DELETE",
                url: `/posts/${id}`
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }]
        })
    })
})

export const { useGetPostsQuery, useGetPostByIdQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation } = postsApi