import React from "react";
import { NavLink } from "react-router-dom";
import { DashboardIcon } from "./icons/DashboardIcon";
import { CreditCardIcon } from "./icons/CreditCardIcon";
import { BtcIcon } from "./icons/BtcIcon";
import { WalletIcon } from "./icons/WalletIcon";
import { PixIcon } from "./icons/PixIcon";
import { HistoryIcon } from "./icons/HistoryIcon";
import { ProfileIcon } from "./icons/ProfileIcon";
import { LogoutIcon } from "./icons/LogoutIcon";
import { XIcon } from "./icons/XIcon";
import { LocationIcon } from "./icons/LocationIcon";
import { ShieldIcon } from "./icons/ShieldIcon";
import { CardCheckIcon } from "./icons/CardCheckIcon";
import { NavItem } from "./molecules/nav-link";

const navItems = [
  { icon: <DashboardIcon />, label: "Dashboard", to: "/" },
  //{ icon: <LocationIcon />, label: "Localização", to: "/location" },
  //{ icon: <ShieldIcon />, label: "Esconder IP", to: "/hide-ip" },
  { icon: <CreditCardIcon />, label: "Cartão → PIX", to: "/card-to-pix" },
  //{ icon: <BtcIcon />, label: "Comprar Cripto", to: "/buy-crypto" },
  //{ icon: <WalletIcon />, label: "Carteiras Cripto", to: "/wallets" },
  //{ icon: <PixIcon />, label: "Chaves PIX", to: "/pix-keys" },
  { icon: <CardCheckIcon />, label: "Testar Cartão", to: "/test-card" },
  { icon: <HistoryIcon />, label: "Histórico", to: "/history" },
  { icon: <ProfileIcon />, label: "Perfil", to: "/profile" },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, onLogout }) => {
  const sidebarContent = (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-8">
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-dark-text">
            CryptoPix
          </h1>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden p-2 rounded-md text-slate-500 dark:text-dark-text-secondary hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
        >
          <XIcon />
        </button>
      </div>
      <nav className="flex-1 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} onClick={() => setIsOpen(false)} />
        ))}
      </nav>
      <div className="mt-auto pt-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-slate-500 dark:text-dark-text-secondary hover:bg-red-500/10 hover:text-red-500 transition-colors duration-200"
        >
          <LogoutIcon />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setIsOpen(false)}
        ></div>
        <div className="relative w-72 h-full bg-white dark:bg-dark-card border-r border-slate-200 dark:border-dark-border">
          {sidebarContent}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 bg-white dark:bg-dark-card border-r border-slate-200 dark:border-dark-border">
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
