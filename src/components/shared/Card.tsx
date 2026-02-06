import React from 'react';

// FIX: Extended CardProps with React.HTMLAttributes<HTMLDivElement> to allow standard div props like 'style'.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl shadow-lg p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
