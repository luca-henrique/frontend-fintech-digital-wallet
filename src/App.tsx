import { BrowserRouter } from "react-router-dom";
import { Routers } from "./routers";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { WalletProvider } from "./context/WalletContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <WalletProvider>
          <Routers />
        </WalletProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
