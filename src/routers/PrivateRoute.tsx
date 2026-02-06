import { useSnapshot } from "valtio";
import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../store/auth";

export const PrivateRoute = () => {
  const snap = useSnapshot(authStore);

  return snap.isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
};
