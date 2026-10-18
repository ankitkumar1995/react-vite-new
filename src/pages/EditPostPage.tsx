import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PostForm } from '../components/posts/PostForm';
import { usePosts } from '../context/PostContext';
import { PostDetailSkeleton } from '../components/ui/Skeleton';
import type { PostFormData } from '../types/post';
import { ChevronRight, AlertCircle, ArrowLeft } from 'lucide-react';

/**
 * ============================================================================
 * ⚡ REDUX TOOLKIT INTEGRATION POINT:
 * In Redux:
 * const dispatch = useAppDispatch();
 * const post = useAppSelector((state) => selectPostById(state, Number(id)));
 * 
 * const handleUpdate = async (formData: PostFormData) => {
 *   await dispatch(updatePost({ id: Number(id), ...formData })).unwrap();
 *   navigate(`/posts/${id}`);
 * };
 * ============================================================================
 */
export const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById, updatePost } = usePosts();

  const [initialData, setInitialData] = useState<PostFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInitialPost = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const post = await getPostById(Number(id));
      if (!post) throw new Error(`Post #${id} not found`);
      setInitialData({
        title: post.title,
        body: post.body,
        tags: post.tags || [],
        userId: post.userId || 1,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load post');
    } finally {
      setLoading(false);
    }
  }, [id, getPostById]);

  useEffect(() => {
    loadInitialPost();
  }, [loadInitialPost]);

  const handleUpdate = async (formData: PostFormData) => {
    if (!id) return;
    await updatePost(Number(id), formData);
    navigate(`/posts/${id}`);
  };

  if (loading) {
    return <PostDetailSkeleton />;
  }

  if (error || !initialData) {
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
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Cannot Edit Post</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {error || `Post #${id} does not exist.`}
        </p>
        <Link to="/" className="btn-primary">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/" className="breadcrumb-link">Posts</Link>
        <ChevronRight size={14} />
        <Link to={`/posts/${id}`} className="breadcrumb-link">Post #{id}</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-secondary)' }}>Edit</span>
      </nav>

      <PostForm
        initialValues={initialData}
        onSubmit={handleUpdate}
        isEditing={true}
      />
    </div>
  );
};
