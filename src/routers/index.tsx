import { Navigate, Route, Routes } from "react-router-dom";

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
import { SignIn } from "../pages/sign-in";

import { PublicRoute } from "./PublicRoute";

import { PrivateLayout } from "../components/layout/private-layout";

export const Routers = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
      <Route element={<PrivateLayout />}>
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
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
