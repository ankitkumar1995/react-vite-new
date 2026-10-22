import type { Post } from "../../../../types/post";

export interface PostsState {
    items: Post[]
    error: string | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    total: number,
    page: number,
    limit: number,
    filters: {
        searchQuery: string,
        selectedTag: string,
        sortBy: 'latest' | 'likes' | 'views' | 'title'
    }
}
