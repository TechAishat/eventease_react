import { createContext, createElement, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const hide = useCallback(() => setToast(null), []);

  const show = useCallback((variant, title, message) => {
    setToast({ variant, title, message });
    const timeout = setTimeout(() => {
      setToast((current) => (current && current.variant === variant ? null : current));
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  const value = useMemo(
    () => ({
      toast,
      showSuccess: (title, message) => show('success', title, message),
      showError: (title, message) => show('error', title, message),
      hide
    }),
    [toast, show, hide]
  );

  return createElement(ToastContext.Provider, { value }, children);
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
