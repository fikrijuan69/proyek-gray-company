import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the types for the Toast state
interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

interface ToastContextProps {
  showToast: (message: string, type: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Toast component that displays the toast
const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide toast after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    isVisible && (
      <div
        className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-md text-white ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {message}
      </div>
    )
  );
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastService = {
  success: (message: string) => {
    const { showToast } = useToast();
    showToast(message, 'success');
  },
  error: (message: string) => {
    const { showToast } = useToast();
    showToast(message, 'error');
  },
};
