import type { Post } from '../../../../types/post';

export interface PostsState {
  items: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  total: number;
  page: number;
  limit: number;
  filters: {
    searchQuery: string;
    selectedTag: string;
    sortBy: 'latest' | 'likes' | 'views' | 'title';
  };
}
