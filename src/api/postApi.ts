import type { Post, PostComment, PostFormData, PostsApiResponse } from '../types/post';

const BASE_URL = 'https://dummyjson.com/posts';

/**
 * Free API Service Layer (DummyJSON)
 * Handles all network requests for Posts CRUD operations.
 * When you migrate to Redux Toolkit, you will call these functions
 * inside createAsyncThunk or convert them to RTK Query endpoints.
 */

export const postApi = {
  // Fetch paginated posts
  async getAllPosts(limit = 10, skip = 0): Promise<PostsApiResponse> {
    const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
    return res.json();
  },

  // Search posts by title or keyword
  async searchPosts(query: string, limit = 10, skip = 0): Promise<PostsApiResponse> {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error(`Search failed: ${res.statusText}`);
    return res.json();
  },

  // Fetch posts filtered by tag
  async getPostsByTag(tag: string, limit = 10, skip = 0): Promise<PostsApiResponse> {
    const res = await fetch(`${BASE_URL}/tag/${encodeURIComponent(tag)}?limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error(`Failed to filter by tag: ${res.statusText}`);
    return res.json();
  },

  // Fetch all post tags
  async getAllTags(): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/tags`);
    if (!res.ok) return ['history', 'american', 'crime', 'french', 'fiction', 'english', 'magical', 'mystery', 'love', 'classic'];
    const data = await res.json();
    if (Array.isArray(data)) {
      return data.map((t: string | { slug: string; name: string }) => 
        typeof t === 'string' ? t : t.slug || t.name
      );
    }
    return ['history', 'american', 'crime', 'french', 'fiction', 'english', 'magical', 'mystery', 'love', 'classic'];
  },

  // Fetch single post details
  async getPostById(id: number | string): Promise<Post> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Post #${id} not found`);
    return res.json();
  },

  // Fetch comments for a post
  async getPostComments(postId: number | string): Promise<PostComment[]> {
    try {
      const res = await fetch(`${BASE_URL}/${postId}/comments`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.comments || [];
    } catch {
      return [];
    }
  },

  // Create new post
  async createPost(formData: PostFormData): Promise<Post> {
    const res = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error('Failed to create post');
    const data = await res.json();
    // Return post with realistic fallbacks
    return {
      ...data,
      id: data.id || Date.now(),
      reactions: data.reactions || { likes: 0, dislikes: 0 },
      views: data.views || 1,
    };
  },

  // Update an existing post
  async updatePost(id: number | string, formData: Partial<PostFormData>): Promise<Post> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error(`Failed to update post #${id}`);
    return res.json();
  },

  // Delete a post
  async deletePost(id: number | string): Promise<{ id: number; isDeleted: boolean }> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Failed to delete post #${id}`);
    return res.json();
  },
};
