import { proxy } from "valtio";
import { AuthService } from "../services/auth";

interface AuthState {
    isLoggedIn: boolean;
    user: { email: string; name: string } | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
}

export const authStore = proxy<AuthState>({
    isLoggedIn: AuthService.isAuthenticated(),
    user: null,

    login: async (credentials) => {
        const response = await AuthService.login(credentials);
        if (response) {
            authStore.isLoggedIn = true;
            authStore.user = response.user;
        }
    },

    logout: () => {
        AuthService.logout();
        authStore.isLoggedIn = false;
        authStore.user = null;
    },

    checkAuth: () => {
        authStore.isLoggedIn = AuthService.isAuthenticated();
    },
});
