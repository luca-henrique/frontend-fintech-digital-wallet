import Button from "@/src/components/shared/Button";
import Card from "@/src/components/shared/Card";
import Input from "@/src/components/shared/Input";
import React, { useState } from "react";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      if (email === "virada@saldo.com" && password === "virada12345") {
        onLogin();
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-dark-bg p-4">
      <Card className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <svg
            className="h-12 w-12 text-brand-accent mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0 0c-1.11 0-2.08-.402-2.599-1M9.401 16c-.52.598-1.401 1-2.599 1m12.198-3.001c.52-.598 1.401-1 2.599-1M12 20a8 8 0 100-16 8 8 0 000 16z"
            ></path>
          </svg>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-dark-text">
            CryptoPix
          </h1>
          <p className="text-slate-500 dark:text-dark-text-secondary">
            Bem-vindo de volta!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <Input
            label="E-mail"
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <Input
            label="Senha"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          {error && (
            <div
              className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span className="text-xl">🎭</span>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <Button type="submit" disabled={!email || !password || isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
