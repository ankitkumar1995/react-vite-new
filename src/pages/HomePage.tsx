import React from 'react';
import { PostFilter } from '../components/posts/PostFilter';
import { PostList } from '../components/posts/PostList';
import { Sparkles, Layers, BookOpen } from 'lucide-react';
import { usePosts } from '../context/PostContext';

export const HomePage: React.FC = () => {
  const { openGuide } = usePosts();

  return (
    <>
      <section className="hero-header">
        <div className="hero-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="learning-badge">
                <Sparkles size={13} style={{ color: '#fbbf24' }} /> Ready For Redux Toolkit
              </span>
            </div>
            <h1>
              CRUD <span className="gradient-text">Operations Hub</span>
            </h1>
            <p className="hero-subtitle">
              Explore posts powered by DummyJSON Free API. Test live Search, Tag Filtering, 
              Sorting, Pagination, and full Create-Read-Update-Delete interactions.
            </p>
          </div>
        </div>

        {/* Learning Status Banner */}
        <div className="redux-status-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Layers size={22} style={{ color: '#818cf8', flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>
                Manual Redux Toolkit Integration Practice
              </strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                This UI is 100% finished with React. Your challenge: connect <code>createSlice</code> & <code>createAsyncThunk</code> to replace the local state!
              </span>
            </div>
          </div>
          <button 
            id="btn-banner-rtk-roadmap"
            className="nav-btn nav-btn-badge"
            onClick={openGuide}
            style={{ whiteSpace: 'nowrap' }}
          >
            <BookOpen size={15} /> View RTK Roadmap
          </button>
        </div>
      </section>

      {/* Filter and Search toolbar */}
      <PostFilter />

      {/* Posts Grid & Pagination */}
      <PostList />
    </>
  );
};
