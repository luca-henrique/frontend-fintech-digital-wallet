import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Dashboard from "../pages/Dashboard";
import CardToPix from "../pages/CardToPix";
import BalanceToCrypto from "../pages/BalanceToCrypto";
import CryptoWallets from "../pages/CryptoWallets";
import PixKeys from "../pages/PixKeys";
import History from "../pages/History";
import Profile from "../pages/Profile";
import Location from "../pages/Location";
import HideIp from "../pages/HideIp";
import TestCard from "../pages/TestCard";
import TransactionSuccess from "../pages/TransactionSuccess";
import { useState, useEffect } from "react";

export const Routers = () => {
  const { theme, setTheme } = useTheme();
  const { isLoggedIn, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  if (!isLoggedIn) return null;

  return (
    <div
      className={`flex h-screen bg-slate-100 dark:bg-dark-bg text-slate-800 dark:text-dark-text font-sans transition-colors duration-300`}
    >
      <Sidebar
        theme={theme}
        setTheme={setTheme}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        onLogout={logout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/card-to-pix" element={<CardToPix />} />
            <Route path="/buy-crypto" element={<BalanceToCrypto />} />
            <Route path="/wallets" element={<CryptoWallets />} />
            <Route path="/pix-keys" element={<PixKeys />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/location" element={<Location />} />
            <Route path="/hide-ip" element={<HideIp />} />
            <Route path="/test-card" element={<TestCard />} />
            <Route path="/success" element={<TransactionSuccess />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
