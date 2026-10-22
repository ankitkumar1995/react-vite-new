/**
 * ============================================================================
 * 🎓 REDUX TOOLKIT TEMPLATE: postsSlice.ts
 * ============================================================================
 * Rename this file to `postsSlice.ts` to implement your Redux Toolkit slice!
 * 
 * Features Demonstrated:
 * 1. createAsyncThunk (async operations for fetch, create, update, delete)
 * 2. createSlice (synchronous action reducers + extraReducers builder)
 * 3. Memoized selectors
 * ============================================================================
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PostsState } from './postsTypes';
import type { Post, PostFormData } from '../../../../types/post';
import { postApi } from '../../../../api/postApi';

// Initial State
const initialState: PostsState = {
  items: [],
  status: 'idle',
  error: null,
  total: 0,
  page: 1,
  limit: 9,
  filters: {
    searchQuery: '',
    selectedTag: 'all',
    sortBy: 'latest',
  },
};

// ----------------------------------------------------------------------------
// 1. ASYNC THUNKS (createAsyncThunk)
// ----------------------------------------------------------------------------

// Fetch Posts with pagination & search/tag filters
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { getState, rejectWithValue }) => {
    try {
      // You can read current state from getState() if needed!
      const state = getState() as { posts: PostsState };
      const { page, limit, filters } = state.posts;
      const skip = (page - 1) * limit;

      if (filters.searchQuery.trim()) {
        return await postApi.searchPosts(filters.searchQuery.trim(), limit, skip);
      }
      if (filters.selectedTag !== 'all') {
        return await postApi.getPostsByTag(filters.selectedTag, limit, skip);
      }
      return await postApi.getAllPosts(limit, skip);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch posts';
      return rejectWithValue(msg);
    }
  }
);

// Create Post
export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (formData: PostFormData, { rejectWithValue }) => {
    try {
      return await postApi.createPost(formData);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create post';
      return rejectWithValue(msg);
    }
  }
);

// Update Post
export const updateExistingPost = createAsyncThunk(
  'posts/updateExistingPost',
  async ({ id, data }: { id: number; data: Partial<PostFormData> }, { rejectWithValue }) => {
    try {
      return await postApi.updatePost(id, data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update post';
      return rejectWithValue(msg);
    }
  }
);

// Delete Post
export const deleteExistingPost = createAsyncThunk(
  'posts/deleteExistingPost',
  async (id: number, { rejectWithValue }) => {
    try {
      await postApi.deletePost(id);
      return id;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete post';
      return rejectWithValue(msg);
    }
  }
);

// ----------------------------------------------------------------------------
// 2. SLICE DEFINITION (createSlice)
// ----------------------------------------------------------------------------
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  // Synchronous action reducers
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.page = 1; // reset to first page on search
    },
    setSelectedTag: (state, action: PayloadAction<string>) => {
      state.filters.selectedTag = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action: PayloadAction<'latest' | 'likes' | 'views' | 'title'>) => {
      state.filters.sortBy = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  // Async action handlers with builder callback
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.posts;
        state.total = action.payload.total;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Something went wrong';
      })

      // Add Post
      .addCase(addNewPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.items.unshift(action.payload);
        state.total += 1;
      })

      // Update Post
      .addCase(updateExistingPost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })

      // Delete Post
      .addCase(deleteExistingPost.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
        state.total = Math.max(0, state.total - 1);
      });
  },
});

export const { setSearchQuery, setSelectedTag, setSortBy, setPage } = postsSlice.actions;

export default postsSlice.reducer;
