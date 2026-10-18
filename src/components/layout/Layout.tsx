import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toast } from '../ui/Toast';
import { ReduxGuideModal } from '../ui/ReduxGuideModal';
import { usePosts } from '../../context/PostContext';

export const Layout: React.FC = () => {
  const { toasts, removeToast, isGuideOpen, closeGuide } = usePosts();

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <Toast toasts={toasts} onRemove={removeToast} />
      <ReduxGuideModal isOpen={isGuideOpen} onClose={closeGuide} />
    </div>
  );
};
