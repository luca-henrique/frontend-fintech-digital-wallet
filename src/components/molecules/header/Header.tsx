import React from "react";
import { MenuIcon } from "../../icons/MenuIcon";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="md:hidden bg-white dark:bg-dark-card border-b border-slate-200 dark:border-dark-border p-4 flex items-center justify-between sticky top-0 z-20 flex-shrink-0">
      <div className="flex items-center gap-2">
        <svg
          className="h-8 w-8 text-brand-accent"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0 0c-1.11 0-2.08-.402-2.599-1M9.401 16c-.52.598-1.401 1-2.599 1m12.198-3.001c.52-.598 1.401-1 2.599-1M12 20a8 8 0 100-16 8 8 0 000 16z"
          ></path>
        </svg>
        <h1 className="text-xl font-bold text-slate-900 dark:text-dark-text">
          CryptoPix
        </h1>
      </div>
      <button
        onClick={onMenuClick}
        className="p-2 rounded-md text-slate-500 dark:text-dark-text-secondary hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
        aria-label="Abrir menu"
      >
        <MenuIcon />
      </button>
    </header>
  );
};

export default Header;
