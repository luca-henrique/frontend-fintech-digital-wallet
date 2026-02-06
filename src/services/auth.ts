import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: {
        email: string;
        name: string;
    };
}

export const AuthService = {
    login: async (credentials: {
        email: string;
        password: string;
    }): Promise<LoginResponse> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (
                    credentials.email === "virada@saldo.com" &&
                    credentials.password === "virada12345"
                ) {
                    const response = {
                        access_token: "fake-jwt-token-" + Math.random().toString(36),
                        refresh_token: "fake-refresh-token-" + Math.random().toString(36),
                        user: {
                            email: credentials.email,
                            name: "Usuário Virada",
                        },
                    };

                    Cookies.set(ACCESS_TOKEN_KEY, response.access_token, { expires: 1 }); // 1 day
                    Cookies.set(REFRESH_TOKEN_KEY, response.refresh_token, {
                        expires: 7,
                    }); // 7 days

                    resolve(response);
                } else {
                    reject(new Error("Credenciais inválidas."));
                }
            }, 1000);
        });
    },

    logout: () => {
        Cookies.remove(ACCESS_TOKEN_KEY);
        Cookies.remove(REFRESH_TOKEN_KEY);
    },

    getAccessToken: () => {
        return Cookies.get(ACCESS_TOKEN_KEY);
    },

    isAuthenticated: () => {
        return !!Cookies.get(ACCESS_TOKEN_KEY);
    },
};
