import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { usePosts } from '../../context/PostContext';

/**
 * ============================================================================
 * ⚡ REDUX TOOLKIT INTEGRATION POINT:
 * In Redux Toolkit, these UI filter states are usually managed in slice reducers:
 * 
 * const dispatch = useAppDispatch();
 * const { searchQuery, selectedTag, sortBy } = useAppSelector((state) => state.posts.filters);
 * 
 * onChange={(e) => dispatch(setSearchQuery(e.target.value))}
 * onClick={() => dispatch(setSelectedTag(tag))}
 * onChange={(e) => dispatch(setSortBy(e.target.value))}
 * ============================================================================
 */
export const PostFilter: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    tags,
  } = usePosts();

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="toolbar-container">
      <div className="search-and-sort">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search posts by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="search-clear-btn" 
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="sort-select-wrapper">
          <SlidersHorizontal size={16} style={{ color: 'var(--text-muted)' }} />
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'latest' | 'likes' | 'views' | 'title')}
            aria-label="Sort posts by"
          >
            <option value="latest">Sort: Default / Latest</option>
            <option value="likes">Sort: Most Liked</option>
            <option value="views">Sort: Most Viewed</option>
            <option value="title">Sort: Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Tag filter pills */}
      <div className="tags-scroll-container">
        <button
          className={`tag-pill ${selectedTag === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedTag('all')}
        >
          All Topics
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tag-pill ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => setSelectedTag(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};
