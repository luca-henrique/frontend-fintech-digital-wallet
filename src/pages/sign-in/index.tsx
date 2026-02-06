import Button from "@/src/components/shared/Button";
import Card from "@/src/components/shared/Card";
import Input from "@/src/components/shared/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { authStore } from "@/src/store/auth";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: authStore.login,
  });

  const onSubmit = (data: LoginFormInputs) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-dark-bg p-4">
      <Card className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-dark-text">
            Digital Wallet
          </h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="E-mail"
            id="email"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            {...register("email")}
            disabled={loginMutation.isPending}
          />
          <Input
            label="Senha"
            id="password"
            type="password"
            placeholder="********"
            error={errors.password?.message}
            {...register("password")}
            disabled={loginMutation.isPending}
          />

          {loginMutation.isError && (
            <p className="text-sm text-center text-red-500">
              {loginMutation.error instanceof Error
                ? loginMutation.error.message
                : "Erro ao realizar login."}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Card>
    </div>
  );
};
