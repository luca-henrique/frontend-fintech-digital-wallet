import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, icon, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-600  mb-1"
        >
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={`w-full bg-slate-100  border ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-slate-300 dark:border-dark-border focus:ring-brand-accent focus:border-brand-accent"} dark:border-dark-border rounded-lg py-2 text-slate-900 dark:text-dark-text focus:ring-2 transition duration-200 ${icon ? "pl-10" : "px-3"} ${className || ""}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
