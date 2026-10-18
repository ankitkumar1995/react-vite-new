import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PostForm } from '../components/posts/PostForm';
import { usePosts } from '../context/PostContext';
import type { PostFormData } from '../types/post';
import { ChevronRight } from 'lucide-react';

/**
 * ============================================================================
 * ⚡ REDUX TOOLKIT INTEGRATION POINT:
 * In Redux:
 * const dispatch = useAppDispatch();
 * 
 * const handleCreate = async (formData: PostFormData) => {
 *   const newPost = await dispatch(createPost(formData)).unwrap();
 *   navigate(`/posts/${newPost.id}`);
 * };
 * ============================================================================
 */
export const CreatePostPage: React.FC = () => {
  const { createPost } = usePosts();
  const navigate = useNavigate();

  const handleCreate = async (formData: PostFormData) => {
    const created = await createPost(formData);
    navigate(`/posts/${created.id}`);
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/" className="breadcrumb-link">Posts</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-secondary)' }}>Create Post</span>
      </nav>

      <PostForm onSubmit={handleCreate} isEditing={false} />
    </div>
  );
};
