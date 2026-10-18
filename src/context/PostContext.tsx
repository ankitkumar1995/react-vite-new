import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Post, PostFormData, ToastMessage, ToastType } from '../types/post';
import { postApi } from '../api/postApi';

/**
 * ============================================================================
 * 🎓 REDUX TOOLKIT LEARNING CONTEXT
 * ============================================================================
 * This context currently handles state using pure React (useState + useEffect).
 * 
 * YOUR LEARNING GOAL:
 * Replace this context step-by-step with Redux Toolkit!
 * 
 * Redux Toolkit Equivalents:
 * - useState(posts)       ➡️  state.posts.items or createEntityAdapter (in postsSlice.ts)
 * - useState(status)      ➡️  state.posts.status ('idle' | 'loading' | 'succeeded' | 'failed')
 * - useState(error)       ➡️  state.posts.error
 * - fetchPosts()          ➡️  createAsyncThunk('posts/fetchPosts', async (...) => ...)
 * - createPost()          ➡️  createAsyncThunk('posts/createPost', async (...) => ...)
 * - updatePost()          ➡️  createAsyncThunk('posts/updatePost', async (...) => ...)
 * - deletePost()          ➡️  createAsyncThunk('posts/deletePost', async (...) => ...)
 * - setSearchQuery()      ➡️  postsSlice.actions.setSearchQuery
 * - setSelectedTag()      ➡️  postsSlice.actions.setSelectedTag
 * - setSortBy()           ➡️  postsSlice.actions.setSortBy
 * ============================================================================
 */

interface PostContextType {
  // State
  posts: Post[];
  filteredPosts: Post[];
  tags: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  total: number;
  page: number;
  limit: number;
  searchQuery: string;
  selectedTag: string;
  sortBy: 'latest' | 'likes' | 'views' | 'title';
  toasts: ToastMessage[];

  // State Setters (Redux: Synchronous Actions)
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string) => void;
  setSortBy: (sort: 'latest' | 'likes' | 'views' | 'title') => void;
  setPage: (page: number) => void;

  // CRUD Operations (Redux: Async Thunks)
  fetchPosts: () => Promise<void>;
  createPost: (data: PostFormData) => Promise<Post>;
  updatePost: (id: number, data: Partial<PostFormData>) => Promise<Post>;
  deletePost: (id: number) => Promise<void>;
  getPostById: (id: number) => Promise<Post | undefined>;

  // Toast notifications (Can also be a separate uiSlice in Redux Toolkit)
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;

  // RTK Guide Modal State
  isGuideOpen: boolean;
  openGuide: () => void;
  closeGuide: () => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState<'latest' | 'likes' | 'views' | 'title'>('latest');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const openGuide = useCallback(() => setIsGuideOpen(true), []);
  const closeGuide = useCallback(() => setIsGuideOpen(false), []);

  // Toast Helpers
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  // Load tags initially
  useEffect(() => {
    postApi.getAllTags().then((fetchedTags) => {
      setTags(fetchedTags);
    }).catch(() => {
      setTags(['history', 'crime', 'fiction', 'english', 'mystery', 'love', 'classic']);
    });
  }, []);

  // Fetch posts from Free API
  const fetchPosts = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const skip = (page - 1) * limit;
      let response;

      if (searchQuery.trim()) {
        response = await postApi.searchPosts(searchQuery.trim(), limit, skip);
      } else if (selectedTag !== 'all') {
        response = await postApi.getPostsByTag(selectedTag, limit, skip);
      } else {
        response = await postApi.getAllPosts(limit, skip);
      }

      setPosts(response.posts);
      setTotal(response.total);
      setStatus('succeeded');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch posts';
      setError(msg);
      setStatus('failed');
      showToast(msg, 'error');
    }
  }, [page, limit, searchQuery, selectedTag, showToast]);

  // Fetch when page, tag, or search changes
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Get single post (checks local list first, falls back to API)
  const getPostById = useCallback(async (id: number): Promise<Post | undefined> => {
    const existing = posts.find((p) => p.id === id);
    if (existing) return existing;
    try {
      return await postApi.getPostById(id);
    } catch {
      return undefined;
    }
  }, [posts]);

  // CREATE Post
  const createPost = useCallback(async (formData: PostFormData): Promise<Post> => {
    try {
      const created = await postApi.createPost(formData);
      // Optimistically add to state
      setPosts((prev) => [created, ...prev]);
      setTotal((prev) => prev + 1);
      showToast('Post created successfully!', 'success');
      return created;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error creating post';
      showToast(msg, 'error');
      throw err;
    }
  }, [showToast]);

  // UPDATE Post
  const updatePost = useCallback(async (id: number, formData: Partial<PostFormData>): Promise<Post> => {
    try {
      const updated = await postApi.updatePost(id, formData);
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
      );
      showToast(`Post #${id} updated successfully!`, 'success');
      return updated;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error updating post';
      showToast(msg, 'error');
      throw err;
    }
  }, [showToast]);

  // DELETE Post
  const deletePost = useCallback(async (id: number): Promise<void> => {
    try {
      await postApi.deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
      showToast(`Post #${id} deleted successfully!`, 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error deleting post';
      showToast(msg, 'error');
      throw err;
    }
  }, [showToast]);

  // Client-side sorting (Redux: can be handled in a memoized createSelector!)
  const filteredPosts = useMemo(() => {
    const list = [...posts];
    switch (sortBy) {
      case 'likes':
        return list.sort((a, b) => (b.reactions?.likes ?? 0) - (a.reactions?.likes ?? 0));
      case 'views':
        return list.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
      case 'title':
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case 'latest':
      default:
        return list; // API default order
    }
  }, [posts, sortBy]);

  const value = {
    posts,
    filteredPosts,
    tags,
    status,
    error,
    total,
    page,
    limit,
    searchQuery,
    selectedTag,
    sortBy,
    toasts,
    isGuideOpen,
    openGuide,
    closeGuide,
    setSearchQuery: (query: string) => {
      setSearchQuery(query);
      setPage(1);
    },
    setSelectedTag: (tag: string) => {
      setSelectedTag(tag);
      setPage(1);
    },
    setSortBy,
    setPage,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    getPostById,
    showToast,
    removeToast,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePosts = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};
