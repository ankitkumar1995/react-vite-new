import React from 'react';

export const PostCardSkeleton: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="skeleton" style={{ width: 60, height: 20 }} />
        <div className="skeleton" style={{ width: 80, height: 16 }} />
      </div>
      <div className="skeleton" style={{ width: '85%', height: 24, marginTop: 8 }} />
      <div className="skeleton" style={{ width: '65%', height: 20 }} />
      <div className="skeleton" style={{ width: '100%', height: 50, marginTop: 12 }} />
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <div className="skeleton" style={{ width: 50, height: 22, borderRadius: 999 }} />
        <div className="skeleton" style={{ width: 60, height: 22, borderRadius: 999 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 12 }}>
        <div className="skeleton" style={{ width: 90, height: 18 }} />
        <div className="skeleton" style={{ width: 60, height: 28 }} />
      </div>
    </div>
  );
};

export const PostDetailSkeleton: React.FC = () => {
  return (
    <div className="detail-card">
      <div className="skeleton" style={{ width: 120, height: 24, marginBottom: 16 }} />
      <div className="skeleton" style={{ width: '80%', height: 40, marginBottom: 12 }} />
      <div className="skeleton" style={{ width: '60%', height: 32, marginBottom: 24 }} />
      <div className="skeleton" style={{ width: '100%', height: 120, marginBottom: 24 }} />
      <div className="skeleton" style={{ width: '100%', height: 50 }} />
    </div>
  );
};
