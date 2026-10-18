import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <div 
        style={{
          width: 64,
          height: 64,
          borderRadius: 'var(--radius-full)',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--primary)',
          marginBottom: '1.5rem',
        }}
      >
        <Compass size={32} />
      </div>
      <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: 420, marginBottom: '2rem' }}>
        The page you are looking for doesn't exist or has been moved to another URL.
      </p>
      <Link to="/" className="btn-primary">
        <Home size={16} /> Return to Dashboard
      </Link>
    </div>
  );
};
