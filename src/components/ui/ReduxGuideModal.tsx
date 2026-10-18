import React from 'react';
import { X, Layers, Zap, Database, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ReduxGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReduxGuideModal: React.FC<ReduxGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content modal-content-large" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="brand-icon" style={{ width: 32, height: 32 }}>
              <Layers size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Redux Toolkit Master Blueprint</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Your complete checklist to implement Redux Toolkit manually into this project
              </p>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Step 1 */}
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="learning-badge" style={{ padding: '0.2rem 0.6rem' }}>Step 1</span>
              <h4 style={{ fontSize: '1rem' }}>Explore Prepared Redux Files</h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              We prepared starter templates inside <code style={{ color: '#38bdf8' }}>src/redux/redux-toolkit/features/posts/</code>:
            </p>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li><strong>postsTypes.ts</strong>: Complete TypeScript interfaces (Post, PostsState, PostFormData).</li>
              <li><strong>postsSlice.template.ts</strong>: Ready pattern with <code>createAsyncThunk</code> & <code>createSlice</code>.</li>
              <li><strong>rtkQueryApi.template.ts</strong>: Alternative modern pattern using RTK Query (<code>createApi</code>).</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="learning-badge" style={{ padding: '0.2rem 0.6rem' }}>Step 2</span>
              <h4 style={{ fontSize: '1rem' }}>Key Features of Redux Toolkit to Practice</h4>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginTop: '0.75rem' }}>
              <div style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#818cf8', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <Zap size={14} /> 1. createAsyncThunk
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Handles async actions (pending, fulfilled, rejected) for fetchPosts, createPost, updatePost, deletePost.
                </p>
              </div>

              <div style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#c084fc', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <Layers size={14} /> 2. createSlice & Reducers
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Synchronous state (filter, search query, sorting) and <code>extraReducers</code> with builder notation.
                </p>
              </div>

              <div style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <Database size={14} /> 3. createEntityAdapter
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Normalize state into <code>{'{ ids, entities }'}</code> for ultra fast O(1) CRUD lookups.
                </p>
              </div>

              <div style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <CheckCircle2 size={14} /> 4. Typed Hooks
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Export <code>useAppDispatch</code> and <code>useAppSelector</code> for type safety across components.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="learning-badge" style={{ padding: '0.2rem 0.6rem' }}>Step 3</span>
              <h4 style={{ fontSize: '1rem' }}>How To Wire It In</h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Every page and component has exact comment tags like:
            </p>
            <div className="redux-code-snippet">
              {`// ⚡ REDUX TOOLKIT INTEGRATION POINT:
// 1. const dispatch = useAppDispatch();
// 2. const { posts, status, error } = useAppSelector((state) => state.posts);
// 3. dispatch(fetchPosts());`}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.75rem', gap: '0.75rem' }}>
          <button className="btn-primary" onClick={onClose}>
            Got it, let's build! <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
