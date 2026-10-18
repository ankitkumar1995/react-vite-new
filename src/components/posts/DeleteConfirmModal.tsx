import React, { useState } from 'react';
import type { Post } from '../../types/post';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (postId: number) => Promise<void>;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  post,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !post) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onConfirm(post.id);
      onClose();
    } catch {
      // Error handled by context toast
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="modal-danger-icon">
            <AlertTriangle size={24} />
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Delete Post</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>"{post.title}"</strong>? 
          This action will simulate a DELETE request on DummyJSON.
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={onClose} 
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn-primary" 
            style={{ background: 'var(--danger)', boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)' }}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span>Deleting...</span>
            ) : (
              <>
                <Trash2 size={16} /> Delete Post
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
