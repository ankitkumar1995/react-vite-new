import React from 'react';
import { Layers, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-glass)', padding: '2rem 1.5rem', marginTop: 'auto' }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={16} className="gradient-text" />
          <span>Redux Toolkit Learning Project &bull; Free API via DummyJSON</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Ready for slices, thunks, selectors & RTK Query</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
            <Code2 size={14} /> React 19 + Vite + TypeScript
          </div>
        </div>
      </div>
    </footer>
  );
};
