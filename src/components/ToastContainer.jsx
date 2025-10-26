import { useToast } from '../hooks/useToast.js';

const ToastContainer = () => {
  const { toast, hide } = useToast();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`toast ${toast.variant === 'success' ? 'toast-success' : 'toast-error'}`}
    >
      <div>
        <strong>{toast.title}</strong>
        <p>{toast.message}</p>
      </div>
      <button onClick={hide} type="button" aria-label="Close notification">
        ×
      </button>
    </div>
  );
};

export default ToastContainer;
