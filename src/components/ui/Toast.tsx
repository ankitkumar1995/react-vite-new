import React from 'react';
import type { ToastMessage } from '../../types/post';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <aside className="toast-container" aria-label="Notifications" aria-live="polite">
      {toasts.map((toast) => {
        const icon =
          toast.type === 'success' ? (
            <CheckCircle2 size={18} />
          ) : toast.type === 'error' ? (
            <AlertCircle size={18} />
          ) : (
            <Info size={18} />
          );

        return (
          <div key={toast.id} className={`toast toast-${toast.type}`} role="status">
            {icon}
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              onClick={() => onRemove(toast.id)}
              className="icon-btn"
              style={{ width: 24, height: 24, border: 'none', background: 'transparent' }}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </aside>
  );
};
