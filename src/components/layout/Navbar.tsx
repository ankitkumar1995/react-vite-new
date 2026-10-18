import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, Plus, BookOpen, Sparkles } from 'lucide-react';
import { usePosts } from '../../context/PostContext';

export const Navbar: React.FC = () => {
  const { total, openGuide } = usePosts();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand-link">
          <div className="brand-icon">
            <Layers size={20} />
          </div>
          <div>
            <span>Redux<span className="gradient-text">Lab</span></span>
            <span style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-muted)', lineHeight: 1 }}>
              CRUD + ROUTING WORKSPACE
            </span>
          </div>
        </Link>

        <nav className="nav-links">
          <button 
            id="btn-rtk-blueprint"
            className="nav-btn nav-btn-badge"
            onClick={openGuide}
            title="View Redux Toolkit Integration Guide"
          >
            <BookOpen size={16} />
            <span>RTK Blueprint</span>
            <Sparkles size={14} style={{ color: '#fbbf24' }} />
          </button>

          {isHome && (
            <span className="learning-badge">
              {total} Posts Loaded
            </span>
          )}

          <Link to="/posts/new" id="btn-create-post" className="nav-btn nav-btn-primary">
            <Plus size={16} />
            <span>Create Post</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
