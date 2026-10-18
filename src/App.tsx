import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PostProvider } from './context/PostContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { PostDetailPage } from './pages/PostDetailPage';
import { CreatePostPage } from './pages/CreatePostPage';
import { EditPostPage } from './pages/EditPostPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * ============================================================================
 * 🌐 APPLICATION ROUTER & STATE PROVIDER
 * ============================================================================
 * Routing Architecture:
 * - /               : Home Dashboard (CRUD List, Search, Filter, Sort, Pagination)
 * - /posts/new      : Create New Post Form
 * - /posts/:id      : Single Post Details + Real Comments
 * - /posts/edit/:id : Edit Post Form
 * - *               : 404 Not Found Page
 * 
 * ⚡ REDUX TOOLKIT NOTE:
 * Right now, <PostProvider> supplies standard React state so the app runs
 * immediately with full CRUD interactivity against DummyJSON.
 * When you are ready to manage state manually via Redux Toolkit:
 * - Wrap <App /> with <Provider store={store}> in src/main.tsx
 * - Connect your slice hooks into the pages/components!
 * ============================================================================
 */
const App: React.FC = () => {
  return (
    <PostProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="posts/new" element={<CreatePostPage />} />
            <Route path="posts/:id" element={<PostDetailPage />} />
            <Route path="posts/edit/:id" element={<EditPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PostProvider>
  );
};

export default App;
