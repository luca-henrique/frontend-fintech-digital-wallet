import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-2xl w-full max-w-md m-4 border border-slate-200 dark:border-dark-border" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 dark:border-dark-border flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-dark-text">{title}</h2>
          <button onClick={onClose} className="text-slate-500 dark:text-dark-text-secondary hover:text-slate-800 dark:hover:text-dark-text transition">
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 text-slate-700 dark:text-dark-text-secondary">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;