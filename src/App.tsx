import { BrowserRouter } from "react-router-dom";

import NotificationCenter from "./components/NotificationCenter";

import { WalletProvider } from "./context/WalletContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import {
  NotificationProvider,
  useNotification,
} from "./context/NotificationContext";
import { Routers } from "./routers";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import LoginPage from "./pages/sign-in";

const AppContent = () => {
  const { isLoggedIn, login } = useAuth();
  const { notifications, dismissNotification } = useNotification();

  if (!isLoggedIn) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <>
      <NotificationCenter
        notifications={notifications}
        onDismiss={dismissNotification}
      />
      <Routers />
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NotificationProvider>
          <ThemeProvider>
            <AuthProvider>
              <WalletProvider>
                <AppContent />
              </WalletProvider>
            </AuthProvider>
          </ThemeProvider>
        </NotificationProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
