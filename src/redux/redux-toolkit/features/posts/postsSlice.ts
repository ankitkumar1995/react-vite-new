import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PostsState } from "./postsTypes";
import { postApi } from "../../../../api/postApi";
import type { Post, PostFormData } from "../../../../types/post";

const initialState: PostsState = {
    items: [],
    error: null,
    status: 'idle',
    total: 0,
    page: 1,
    limit: 10,
    filters: {
        searchQuery: '',
        selectedTag: '',
        sortBy: 'latest'
    }
}

// Fetch Posts with pagination & search/tag filters
const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState() as { posts: PostsState }
        const { page, limit, filters } = state.posts
        const skip = (page - 1) * limit
        if (filters.searchQuery.trim()) {
            return await postApi.searchPosts(filters.searchQuery.trim(), limit, skip)
        }
        if (filters.selectedTag !== "all") {
            return await postApi.getPostsByTag(filters.selectedTag, limit, skip)
        }
        return await postApi.getAllPosts(limit, skip)
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Failed to fetch posts'
        return rejectWithValue(msg)
    }
})

// create posts
const createPost = createAsyncThunk("posts/addNewPost", async (formData: PostFormData, { rejectWithValue }) => {
    try {
        return await postApi.createPost(formData)
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Failed to create post"
        return rejectWithValue(msg)
    }
})

// update posts
const updatePost = createAsyncThunk("posts/updatePost", async ({ id, formData }: { id: string, formData: Partial<PostFormData> }, { rejectWithValue }) => {
    try {
        return await postApi.updatePost(id, formData)
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Failed to update post"
        return rejectWithValue(msg)
    }
})

// delete posts
const deletePost = createAsyncThunk("posts/deletePost", async (id: number, { rejectWithValue }) => {
    try {
        await postApi.deletePost(id)
        return id
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Failed to delete post'
        return rejectWithValue(msg)
    }
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.filters.searchQuery = action.payload
            state.page = 1
        },
        setSelectedTag: (state, action: PayloadAction<string>) => {
            state.filters.selectedTag = action.payload
            state.page = 1
        },
        setFilters: (state, action: PayloadAction<"latest" | "likes" | "views" | "title">) => {
            state.filters.sortBy = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        }
    },

    // Async action handlers with  builder callback
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = "loading"
            state.error = null
        }).addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload.posts;
            state.total = action.payload.total
        }).addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload as string || 'Something went wrong'
        }).addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
            state.items.unshift(action.payload)
            state.total++
        }).addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
            const updatedPost = action.payload
            const index = state.items.findIndex((p) => p.id === updatedPost.id)
            if (index !== -1) {
                state.items[index] = updatedPost
            }
        }).addCase(deletePost.fulfilled, (state, action) => {
            const deletedId = action.meta.arg
            state.items = state.items.filter((p) => p.id !== deletedId)
            state.total--
        })

    }
})


export const { setSearchQuery, setSelectedTag, setPage, setFilters } = postsSlice.actions
export default postsSlice.reducer