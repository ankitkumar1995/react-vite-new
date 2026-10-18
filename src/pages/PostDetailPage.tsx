import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Post, PostComment } from '../types/post';
import { postApi } from '../api/postApi';
import { usePosts } from '../context/PostContext';
import { PostDetailSkeleton } from '../components/ui/Skeleton';
import { DeleteConfirmModal } from '../components/posts/DeleteConfirmModal';
import { 
  ArrowLeft, 
  Heart, 
  Eye, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  User, 
  ChevronRight,
  AlertCircle 
} from 'lucide-react';

/**
 * ============================================================================
 * ⚡ REDUX TOOLKIT INTEGRATION POINT:
 * In Redux:
 * 1. Read post from state via memoized selector:
 *    const post = useAppSelector((state) => selectPostById(state, Number(id)));
 * 
 * 2. If not found in cache, dispatch:
 *    dispatch(fetchPostById(id));
 * ============================================================================
 */
export const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById, deletePost } = usePosts();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const postId = Number(id);
      const postData = await getPostById(postId);
      if (!postData) {
        throw new Error(`Post #${id} could not be found.`);
      }
      setPost(postData);

      // Load comments
      const commentData = await postApi.getPostComments(postId);
      setComments(commentData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load post');
    } finally {
      setLoading(false);
    }
  }, [id, getPostById]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return <PostDetailSkeleton />;
  }

  if (error || !post) {
    return (
      <div 
        style={{
          background: 'var(--danger-bg)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 1.5rem',
          textAlign: 'center',
          maxWidth: '540px',
          margin: '3rem auto',
        }}
      >
        <AlertCircle size={40} style={{ color: 'var(--danger)', margin: '0 auto 1rem' }} />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Post Not Found</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {error || `We couldn't retrieve post #${id}.`}
        </p>
        <Link to="/" className="btn-primary">
          <ArrowLeft size={16} /> Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/" className="breadcrumb-link">Posts</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-secondary)' }}>Post #{post.id}</span>
      </nav>

      {/* Main Post Card */}
      <article className="detail-card">
        <div className="detail-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span className="post-id-badge" style={{ fontSize: '0.85rem' }}>
              Post #{post.id}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <User size={15} />
              <span>Author: User {post.userId}</span>
            </div>
          </div>

          <h1 className="detail-title">{post.title}</h1>

          {post.tags && post.tags.length > 0 && (
            <div className="post-tags" style={{ marginBottom: 0 }}>
              {post.tags.map((tag, i) => (
                <span key={i} className="tag-badge" style={{ fontSize: '0.8rem', padding: '0.2rem 0.65rem' }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <p className="detail-body">{post.body}</p>

        {/* Meta Bar */}
        <div className="detail-meta-bar">
          <div className="post-stats" style={{ fontSize: '0.9rem' }}>
            <span className="stat-item" style={{ gap: '0.4rem' }}>
              <Heart size={16} style={{ color: '#f43f5e', fill: (post.reactions?.likes ?? 0) > 0 ? '#f43f5e' : 'none' }} />
              <strong>{post.reactions?.likes ?? 0}</strong> Likes
            </span>
            <span className="stat-item" style={{ gap: '0.4rem' }}>
              <Eye size={16} />
              <strong>{post.views ?? 0}</strong> Views
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to={`/posts/edit/${post.id}`} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1rem' }}>
              <Edit3 size={15} /> Edit
            </Link>
            <button 
              className="btn-secondary"
              onClick={() => setShowDeleteModal(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1rem', borderColor: 'rgba(244, 63, 94, 0.4)', color: '#f43f5e' }}
            >
              <Trash2 size={15} /> Delete
            </button>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="comments-section">
        <div className="comments-header">
          <MessageSquare size={18} className="gradient-text" />
          <h3>Comments ({comments.length})</h3>
        </div>

        {comments.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No comments yet on this post.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span className="comment-user">{comment.user?.fullName || comment.user?.username || 'User'}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Heart size={12} style={{ color: '#f43f5e' }} /> {comment.likes}
                  </span>
                </div>
                <p className="comment-body">{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        post={post}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async (idToDelete) => {
          await deletePost(idToDelete);
          navigate('/');
        }}
      />
    </div>
  );
};
