import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../../types/post';
import { Heart, Eye, Edit3, Trash2, ArrowUpRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onDeleteRequest: (post: Post) => void;
}

/**
 * ============================================================================
 * ⚡ REDUX TOOLKIT INTEGRATION POINT:
 * In a Redux app, you could dispatch actions right from this card:
 * - dispatch(deletePost(post.id))
 * - dispatch(likePost(post.id))  <-- optimistic update example!
 * - dispatch(selectCurrentPost(post))
 * ============================================================================
 */
export const PostCard: React.FC<PostCardProps> = ({ post, onDeleteRequest }) => {
  return (
    <article className="post-card">
      <div className="post-header">
        <div className="post-meta-top">
          <span className="post-id-badge">#{post.id}</span>
          <span>Author: User {post.userId}</span>
        </div>

        <Link to={`/posts/${post.id}`}>
          <h2 className="post-title" title={post.title}>
            {post.title}
          </h2>
        </Link>

        <p className="post-body">
          {post.body}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, i) => (
              <span key={i} className="tag-badge">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="post-footer">
        <div className="post-stats">
          <span className="stat-item" title="Likes">
            <Heart size={14} style={{ color: '#f43f5e', fill: (post.reactions?.likes ?? 0) > 0 ? '#f43f5e' : 'none' }} />
            {post.reactions?.likes ?? 0}
          </span>
          <span className="stat-item" title="Views">
            <Eye size={14} />
            {post.views ?? 0}
          </span>
        </div>

        <div className="post-actions">
          <Link 
            to={`/posts/${post.id}`} 
            className="icon-btn" 
            title="View Details"
          >
            <ArrowUpRight size={16} />
          </Link>
          <Link 
            to={`/posts/edit/${post.id}`} 
            className="icon-btn" 
            title="Edit Post"
          >
            <Edit3 size={15} />
          </Link>
          <button 
            onClick={() => onDeleteRequest(post)} 
            className="icon-btn icon-btn-danger" 
            title="Delete Post"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
};
