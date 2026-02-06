import { useSnapshot } from "valtio";
import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../store/auth";

export const PublicRoute = () => {
  const snap = useSnapshot(authStore);

  return snap.isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};
