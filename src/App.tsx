import { BrowserRouter } from "react-router-dom";

import NotificationCenter from "./components/NotificationCenter";

import { WalletProvider } from "./context/WalletContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import { Routers } from "./routers";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { SignIn } from "./pages/sign-in";

const AppContent = () => {
  const { isLoggedIn, login } = useAuth();

  if (!isLoggedIn) {
    return <SignIn onLogin={login} />;
  }

  return (
    <>
      <Routers />
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
