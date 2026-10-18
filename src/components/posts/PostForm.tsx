import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PostFormData } from '../../types/post';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';

interface PostFormProps {
  initialValues?: PostFormData;
  onSubmit: (data: PostFormData) => Promise<void>;
  isEditing?: boolean;
}

/**
 * ============================================================================
 * ⚡ REDUX TOOLKIT INTEGRATION POINT:
 * In a Redux app, form submission dispatches an async thunk:
 * 
 * const dispatch = useAppDispatch();
 * 
 * if (isEditing) {
 *   await dispatch(updatePost({ id, ...data })).unwrap();
 * } else {
 *   await dispatch(createPost(data)).unwrap();
 * }
 * navigate('/');
 * ============================================================================
 */
export const PostForm: React.FC<PostFormProps> = ({
  initialValues = { title: '', body: '', tags: ['technology'], userId: 1 },
  onSubmit,
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PostFormData>(initialValues);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: { title?: string; body?: string } = {};
    if (!formData.title.trim()) {
      errs.title = 'Title is required';
    } else if (formData.title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters';
    }

    if (!formData.body.trim()) {
      errs.body = 'Content body is required';
    } else if (formData.body.trim().length < 15) {
      errs.body = 'Content must be at least 15 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch {
      // error handled via toast in parent/context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const cleanTag = tagInput.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanTag && !formData.tags.includes(cleanTag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, cleanTag] }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          {isEditing
            ? 'Update the title, content, and tags for this post.'
            : 'Fill out the form below to publish a new post to the DummyJSON API.'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label className="form-label" htmlFor="post-title">
            <span>Post Title</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              {formData.title.length}/100
            </span>
          </label>
          <input
            id="post-title"
            type="text"
            className="form-input"
            placeholder="Enter an engaging post title..."
            value={formData.title}
            maxLength={100}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, title: e.target.value }));
              if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
            }}
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        {/* Content Body */}
        <div className="form-group">
          <label className="form-label" htmlFor="post-body">
            <span>Post Content</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              {formData.body.length} characters
            </span>
          </label>
          <textarea
            id="post-body"
            className="form-textarea"
            placeholder="Write your article, story, or discussion here..."
            value={formData.body}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, body: e.target.value }));
              if (errors.body) setErrors((prev) => ({ ...prev, body: undefined }));
            }}
          />
          {errors.body && <span className="form-error">{errors.body}</span>}
        </div>

        {/* Tags */}
        <div className="form-group">
          <label className="form-label" htmlFor="post-tags">Tags & Topics</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input
              id="post-tags"
              type="text"
              className="form-input"
              placeholder="Type a tag and press Enter (e.g. tech, news)..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
            <button
              type="button"
              className="nav-btn"
              onClick={handleAddTag}
              disabled={!tagInput.trim()}
            >
              <Plus size={16} /> Add
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {formData.tags.map((tag) => (
              <span key={tag} className="tag-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.65rem' }}>
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
                  aria-label={`Remove tag ${tag}`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* User ID */}
        <div className="form-group">
          <label className="form-label" htmlFor="post-author">Author User ID</label>
          <select
            id="post-author"
            className="sort-select"
            value={formData.userId}
            onChange={(e) => setFormData((prev) => ({ ...prev, userId: Number(e.target.value) }))}
          >
            {[1, 2, 3, 4, 5, 10, 15, 20].map((id) => (
              <option key={id} value={id}>
                User #{id} (Simulated Author)
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            <ArrowLeft size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save size={16} />
                <span>{isEditing ? 'Update Post' : 'Publish Post'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
