import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-600 dark:text-dark-text-secondary mb-1">
        {label}
      </label>
      <select
        id={id}
        className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-dark-border rounded-lg py-2 px-3 text-slate-900 dark:text-dark-text focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition duration-200"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;