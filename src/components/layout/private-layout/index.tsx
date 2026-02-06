import { useState, useEffect } from "react";

import { authStore } from "@/src/store/auth";
import { useLocation } from "react-router-dom";

import Sidebar from "../../organisms/sidebar/Sidebar";
import Header from "../../molecules/header/Header";
import { PrivateRoute } from "@/src/routers/PrivateRoute";

export const PrivateLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-slate-100 dark:bg-dark-bg text-slate-800 dark:text-dark-text font-sans transition-colors duration-300`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        onLogout={authStore.logout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <PrivateRoute />
        </main>
      </div>
    </div>
  );
};
