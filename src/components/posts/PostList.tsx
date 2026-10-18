import React, { useState } from 'react';
import type { Post } from '../../types/post';
import { PostCard } from './PostCard';
import { PostCardSkeleton } from '../ui/Skeleton';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { usePosts } from '../../context/PostContext';
import { AlertCircle, RotateCcw, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

/**
 * ============================================================================
 * ⚡ REDUX TOOLKIT INTEGRATION POINT:
 * 
 * 1. Read state from store:
 *    const { filteredPosts, status, error, page, total, limit } = useAppSelector(
 *      (state) => state.posts
 *    );
 * 
 * 2. Dispatch fetch action:
 *    const dispatch = useAppDispatch();
 *    useEffect(() => { dispatch(fetchPosts()); }, [dispatch]);
 * 
 * 3. Delete action:
 *    dispatch(deletePost(id));
 * ============================================================================
 */
export const PostList: React.FC = () => {
  const {
    filteredPosts,
    status,
    error,
    page,
    setPage,
    total,
    limit,
    fetchPosts,
    deletePost,
  } = usePosts();

  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const totalPages = Math.ceil(total / limit) || 1;

  if (status === 'loading') {
    return (
      <div className="posts-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div
        style={{
          background: 'var(--danger-bg)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          textAlign: 'center',
          maxWidth: '540px',
          margin: '3rem auto',
        }}
      >
        <AlertCircle size={40} style={{ color: 'var(--danger)', margin: '0 auto 1rem' }} />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Failed to Load Posts</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {error || 'An error occurred while fetching posts from the free API.'}
        </p>
        <button className="btn-primary" onClick={() => fetchPosts()}>
          <RotateCcw size={16} /> Try Again
        </button>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '3.5rem 1.5rem',
          textAlign: 'center',
          maxWidth: '540px',
          margin: '2rem auto',
        }}
      >
        <Inbox size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Posts Found</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Try clearing search filters or create a new post using the button above.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="posts-grid">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDeleteRequest={(target) => setPostToDelete(target)}
          />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Posts pagination">
          <button
            className="page-btn"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum = i + 1;
            if (totalPages > 5 && page > 3) {
              pageNum = page - 2 + i;
              if (pageNum > totalPages) pageNum = totalPages - (4 - i);
            }
            return (
              <button
                key={pageNum}
                className={`page-btn ${page === pageNum ? 'active' : ''}`}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            className="page-btn"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </nav>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        post={postToDelete}
        isOpen={Boolean(postToDelete)}
        onClose={() => setPostToDelete(null)}
        onConfirm={async (id) => {
          await deletePost(id);
        }}
      />
    </>
  );
};
