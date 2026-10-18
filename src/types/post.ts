export interface PostReactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: PostReactions;
  views: number;
  userId: number;
}

export interface PostComment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface PostsApiResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostFormData {
  title: string;
  body: string;
  tags: string[];
  userId: number;
}

export interface PostFilterOptions {
  searchQuery: string;
  selectedTag: string;
  sortBy: 'latest' | 'likes' | 'views' | 'title';
  page: number;
  limit: number;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}
