import React from "react";
import { NavLink } from "react-router-dom";

export const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  to: string;
  onClick?: () => void;
}> = ({ icon, label, to, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
          isActive
            ? "bg-brand-accent/20 text-brand-accent font-semibold"
            : "text-slate-500 dark:text-dark-text-secondary hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};
